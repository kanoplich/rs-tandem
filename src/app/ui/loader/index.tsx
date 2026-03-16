import { motion, AnimatePresence } from 'framer-motion';

import styles from './styles.module.css';

interface LoaderProps {
  size?: number;
  speed?: number;
  thickness?: number;
  color?: string;
}

export const Loader = ({
  size = 80,
  speed = 0.8,
  thickness = 2.5,
  color = 'var(--primary)',
}: LoaderProps) => {
  const cssVariables = {
    '--loader-size': `${size}px`,
    '--loader-speed': `${speed}s`,
    '--loader-thickness': `${thickness}px`,
    '--loader-color': color,
  } as React.CSSProperties;

  return (
    <AnimatePresence>
      {
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div style={cssVariables}>
            <motion.div
              className={styles.loader}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
          </div>
        </motion.div>
      }
    </AnimatePresence>
  );
};
