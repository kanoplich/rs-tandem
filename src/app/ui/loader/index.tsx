import React, { useEffect } from 'react';

import styles from './styles.module.css';

interface LoaderProps {
  loading: boolean;
  size?: number;
  speed?: number;
  thickness?: number;
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  loading,
  size = 80,
  speed = 4,
  thickness = 2.5,
  color = 'var(--primary)',
}) => {
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loading]);

  if (!loading) return null;

  return (
    <div className={styles.overlay}>
      <div
        className={styles.loader}
        style={
          {
            '--loader-size': `${size}px`,
            '--loader-speed': `${speed}s`,
            '--loader-thickness': `${thickness}px`,
            '--loader-color': color,
          } as React.CSSProperties
        }
      />
    </div>
  );
};

export default Loader;
