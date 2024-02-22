// OverlayComponent.tsx
import React, { useState } from 'react';

interface OverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

const OverlayComponent: React.FC<OverlayProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        padding: '20px',
        background: 'white',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <p>Hello</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OverlayComponent;
