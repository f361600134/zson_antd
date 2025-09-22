import React from 'react';

export const DefaultThemePreview: React.FC = () => (
  <div style={{
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #ffffff 0%, #f0f5ff 100%)',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      height: '12px',
      background: 'linear-gradient(90deg, #1677ff 0%, #69b1ff 100%)',
      borderRadius: '6px 6px 0 0'
    }} />
    <div style={{
      position: 'absolute',
      top: '16px',
      left: '6px',
      width: '20px',
      height: '3px',
      backgroundColor: '#1677ff',
      borderRadius: '1px',
      opacity: 0.8
    }} />
    <div style={{
      position: 'absolute',
      top: '22px',
      left: '6px',
      width: '14px',
      height: '3px',
      backgroundColor: '#91caff',
      borderRadius: '1px'
    }} />
    <div style={{
      position: 'absolute',
      right: '6px',
      top: '16px',
      width: '12px',
      height: '16px',
      backgroundColor: '#f0f5ff',
      borderRadius: '2px',
      border: '1px solid #d6e4ff'
    }} />
  </div>
);

export const DarkThemePreview: React.FC = () => (
  <div style={{
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #1f1f1f 0%, #141414 100%)',
    borderRadius: '6px',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      height: '12px',
      background: 'linear-gradient(90deg, #434343 0%, #595959 100%)',
      borderRadius: '6px 6px 0 0'
    }} />
    <div style={{
      position: 'absolute',
      top: '16px',
      left: '6px',
      width: '20px',
      height: '3px',
      backgroundColor: '#8c8c8c',
      borderRadius: '1px'
    }} />
    <div style={{
      position: 'absolute',
      top: '22px',
      left: '6px',
      width: '14px',
      height: '3px',
      backgroundColor: '#595959',
      borderRadius: '1px'
    }} />
    <div style={{
      position: 'absolute',
      right: '6px',
      top: '16px',
      width: '12px',
      height: '16px',
      backgroundColor: '#2f2f2f',
      borderRadius: '2px',
      border: '1px solid #434343'
    }} />
    <div style={{
      position: 'absolute',
      bottom: '6px',
      left: '6px',
      width: '4px',
      height: '4px',
      backgroundColor: '#1677ff',
      borderRadius: '50%',
      boxShadow: '0 0 4px rgba(22, 119, 255, 0.5)'
    }} />
  </div>
);

export const CompactThemePreview: React.FC = () => (
  <div style={{
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #FEFEFE 0%, #F8F9FA 50%, #F1F3F4 100%)',
    borderRadius: '6px',
    border: '1px solid #E5E7EB',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      height: '12px',
      background: 'linear-gradient(90deg, #1B4D3E 0%, #9CA3AF 50%, #E5E7EB 100%)',
      borderRadius: '6px 6px 0 0'
    }} />
    <div style={{
      position: 'absolute',
      top: '16px',
      left: '6px',
      width: '8px',
      height: '10px',
      backgroundColor: '#1B4D3E',
      borderRadius: '1px',
      opacity: 0.9
    }} />
    <div style={{
      position: 'absolute',
      top: '16px',
      left: '16px',
      width: '8px',
      height: '10px',
      backgroundColor: '#9CA3AF',
      borderRadius: '1px',
      opacity: 0.7
    }} />
    <div style={{
      position: 'absolute',
      top: '16px',
      left: '26px',
      width: '8px',
      height: '10px',
      backgroundColor: '#E5E7EB',
      borderRadius: '1px',
      opacity: 0.5
    }} />
    {[6, 12, 18].map((right, index) => (
      <div key={index} style={{
        position: 'absolute',
        bottom: '8px',
        right: `${right}px`,
        width: '3px',
        height: '3px',
        backgroundColor: index === 0 ? '#1B4D3E' : index === 1 ? '#9CA3AF' : '#E5E7EB',
        borderRadius: '50%'
      }} />
    ))}
  </div>
);

export const ColorfulThemePreview: React.FC = () => (
  <div style={{
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #FAF9F7 0%, #F5F3F0 30%, #F0EDE8 70%, #E7E5E4 100%)',
    borderRadius: '6px',
    border: '1px solid #E7E5E4',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      height: '12px',
      background: 'linear-gradient(90deg, #8B5A6B 0%, #A8A29E 50%, #D6D3D1 100%)',
      borderRadius: '6px 6px 0 0'
    }} />
    {[
      { top: 14, left: 8, size: 6, color: '#eb2f96', rotation: 45 },
      { top: 18, left: 16, size: 5, color: '#f759ab', rotation: 25 },
      { top: 22, left: 24, size: 4, color: '#ff85c0', rotation: 65 }
    ].map((petal, index) => (
      <div key={index} style={{
        position: 'absolute',
        top: `${petal.top}px`,
        left: `${petal.left}px`,
        width: `${petal.size}px`,
        height: `${petal.size}px`,
        backgroundColor: petal.color,
        borderRadius: '50% 0 50% 0',
        transform: `rotate(${petal.rotation}deg)`,
        opacity: 0.8 - index * 0.1
      }} />
    ))}
    <div style={{
      position: 'absolute',
      bottom: '6px',
      right: '8px',
      width: '8px',
      height: '8px',
      background: 'radial-gradient(circle, #fff0f6 0%, #ffadd2 100%)',
      borderRadius: '50%',
      opacity: 0.8
    }} />
    <div style={{
      position: 'absolute',
      bottom: '10px',
      right: '18px',
      width: '6px',
      height: '6px',
      background: 'radial-gradient(circle, #fff0f6 0%, #ff85c0 100%)',
      borderRadius: '50%',
      opacity: 0.6
    }} />
  </div>
);

export const LuxuryThemePreview: React.FC = () => (
  <div style={{
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #121212 0%, #1F1F1F 50%, #2A2A2A 100%)',
    borderRadius: '6px',
    border: '1px solid #333333',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      height: '12px',
      background: 'linear-gradient(90deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)',
      borderRadius: '6px 6px 0 0',
      boxShadow: '0 0 8px rgba(255, 215, 0, 0.5)'
    }} />
    <div style={{
      position: 'absolute',
      top: '16px',
      left: '8px',
      width: '6px',
      height: '6px',
      backgroundColor: '#FFD700',
      transform: 'rotate(45deg)',
      opacity: 0.9,
      filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.6))'
    }} />
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '18px',
      width: '4px',
      height: '4px',
      backgroundColor: '#D4AF37',
      transform: 'rotate(45deg)',
      opacity: 0.8,
      filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.5))'
    }} />
    <div style={{
      position: 'absolute',
      top: '14px',
      right: '8px',
      fontSize: '10px',
      color: '#FFD700',
      opacity: 0.7,
      filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.4))'
    }}>♔</div>
    <div style={{
      position: 'absolute',
      bottom: '8px',
      left: '6px',
      fontSize: '8px',
      color: '#D4AF37',
      opacity: 0.6
    }}>★</div>
    <div style={{
      position: 'absolute',
      bottom: '6px',
      right: '12px',
      fontSize: '6px',
      color: '#FFD700',
      opacity: 0.8
    }}>✦</div>
    <div style={{
      position: 'absolute',
      bottom: '12px',
      right: '6px',
      width: '8px',
      height: '8px',
      background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
      borderRadius: '50%'
    }} />
  </div>
);
