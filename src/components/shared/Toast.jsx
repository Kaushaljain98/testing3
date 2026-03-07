import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const toastConfig = {
  success: {
    icon: CheckCircle,
    className: 'bg-success/10 text-green-600 dark:text-green-400 border-green-500/50'
  },
  error: {
    icon: XCircle,
    className: 'bg-danger/10 text-red-600 dark:text-red-400 border-red-500/50'
  },
  warning: {
    icon: AlertCircle,
    className: 'bg-warning/10 text-amber-600 dark:text-amber-400 border-amber-500/50'
  },
  info: {
    icon: Info,
    className: 'bg-info/10 text-blue-600 dark:text-blue-400 border-blue-500/50'
  }
};

export default function Toast({ message, type = 'info', onClose }) {
  const config = toastConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg min-w-[320px] max-w-md ${config.className}`}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
