import React from 'react';

// Unified atmospheric green background for all era quote blocks
const GREEN_BLOCK_STYLE = {
  background: 'radial-gradient(circle at center, rgba(31, 61, 43, 0.75) 0%, rgba(7, 9, 12, 0.95) 75%)'
};

export default function EraBlock({ block }) {
  if (!block) return null;

  return (
    <section className={`block ${block.id}`} style={GREEN_BLOCK_STYLE}>
      <div>
        <q>{block.quote}</q>
        <small>{block.sub}</small>
      </div>
    </section>
  );
}
