import { motion } from 'framer-motion';

const statusConfig = {
  in_transit: {
    label: 'In Transit',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-success/10 text-green-600 dark:text-green-400 border-green-500/20'
  },
  pending: {
    label: 'Pending',
    color: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20'
  },
  customs_hold: {
    label: 'Customs Hold',
    color: 'bg-warning/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
  },
  excursion: {
    label: 'Excursion',
    color: 'bg-danger/10 text-red-600 dark:text-red-400 border-red-500/20'
  }
};

export default function StatusPill({ status, className = '' }) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.color} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {config.label}
    </motion.span>
  );
}
