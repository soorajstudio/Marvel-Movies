import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export default function GreenFog() {
  const canvasRef = useRef(null);
  const { activeView } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: 'low-power'
    });
    if (!gl) return;

    const vs = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
    const fs = `
      precision mediump float;
      uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uAmount;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1,0)), f.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
      }
      float fbm(vec2 p){
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 4; i++){
          v += a * noise(p);
          p = p * 2.03 + vec2(1.7, 9.2);
          a *= 0.5;
        }
        return v;
      }
      void main(){
        vec2 uv = gl_FragCoord.xy / uRes;
        vec2 q = uv * vec2(uRes.x / uRes.y, 1.0);
        float t = uTime * 0.07;
        vec2 drift = vec2(t * 0.6, -t * 0.25) + uMouse * 0.06;
        float n1 = fbm(q * 1.6 + drift);
        float n2 = fbm(q * 3.1 - drift * 1.4 + vec2(5.2, 1.3));
        float smoke = smoothstep(0.35, 0.95, n1 * 0.75 + n2 * 0.45);
        float vig = 1.0 - smoothstep(0.35, 1.05, length((uv - 0.5) * vec2(1.15, 1.35)));
        float a = smoke * vig * uAmount;
        vec3 col = mix(vec3(0.04, 0.28, 0.13), vec3(0.22, 0.80, 0.42), smoke);
        gl_FragColor = vec4(col * a, a);
      }
    `;

    const sh = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uAmount = gl.getUniformLocation(prog, 'uAmount');
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const SCALE = window.matchMedia('(hover: none) and (pointer: coarse)').matches ? 0.3 : 0.5;
    function resize() {
      canvas.width = Math.ceil(window.innerWidth * SCALE);
      canvas.height = Math.ceil(window.innerHeight * SCALE);
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();

    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let amount = 0;
    const start = performance.now();
    let last = 0;
    let animId;

    function frame(now) {
      if (document.hidden || activeView !== 'scroll') {
        animId = requestAnimationFrame(frame);
        return;
      }
      if (now - last < 33) {
        animId = requestAnimationFrame(frame);
        return;
      }
      last = now;

      const t = (now - start) / 1000;
      amount += (0.5 - amount) * 0.02;
      mouse.x += (target.x - mouse.x) * 0.03;
      mouse.y += (target.y - mouse.y) * 0.03;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uAmount, amount);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, [activeView]);

  return (
    <canvas
      ref={canvasRef}
      id="fog"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
