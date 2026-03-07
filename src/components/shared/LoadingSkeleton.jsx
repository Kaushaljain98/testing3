import { motion } from 'framer-motion';

export default function LoadingSkeleton({ type = 'card', count = 1, className = '' }) {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`bg-surface border border-border rounded-xl p-6 ${className}`}>
            <div className="animate-pulse space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-border rounded-lg shimmer" />
                <div className="w-16 h-6 bg-border rounded shimmer" />
              </div>
              <div className="space-y-2">
                <div className="w-24 h-8 bg-border rounded shimmer" />
                <div className="w-32 h-4 bg-border rounded shimmer" />
              </div>
            </div>
          </div>
        );

      case 'row':
        return (
          <div className={`bg-surface border-b border-border p-4 ${className}`}>
            <div className="animate-pulse flex items-center gap-4">
              <div className="w-12 h-12 bg-border rounded-lg shimmer" />
              <div className="flex-1 space-y-2">
                <div className="w-3/4 h-4 bg-border rounded shimmer" />
                <div className="w-1/2 h-3 bg-border rounded shimmer" />
              </div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className={`space-y-2 ${className}`}>
            <div className="w-full h-4 bg-border rounded shimmer" />
            <div className="w-5/6 h-4 bg-border rounded shimmer" />
            <div className="w-4/6 h-4 bg-border rounded shimmer" />
          </div>
        );

      default:
        return (
          <div className={`w-full h-32 bg-border rounded-xl shimmer ${className}`} />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </motion.div>
  );
}
