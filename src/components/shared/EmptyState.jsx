import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Package,
  title = 'No data available',
  description,
  action,
  actionLabel,
  className = ''
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
    >
      <div className="p-4 bg-border rounded-full mb-4">
        <Icon className="w-8 h-8 text-muted" />
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-secondary max-w-md mb-6">{description}</p>
      )}
      {action && actionLabel && (
        <button
          onClick={action}
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
