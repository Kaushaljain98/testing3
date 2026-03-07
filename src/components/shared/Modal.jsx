import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showClose = true
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`bg-surface border border-border rounded-2xl shadow-2xl w-full ${sizeClasses[size]} pointer-events-auto max-h-[90vh] overflow-hidden flex flex-col`}
            >
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-2xl font-bold text-primary">{title}</h2>
                  {showClose && (
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-border rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-secondary" />
                    </button>
                  )}
                </div>
              )}
              <div className="p-6 overflow-y-auto scrollbar-thin flex-1">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
