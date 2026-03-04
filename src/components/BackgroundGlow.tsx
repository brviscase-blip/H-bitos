import React from 'react';

export function BackgroundGlow() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none z-0" />
  );
}
