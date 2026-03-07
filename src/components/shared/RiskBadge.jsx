import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const riskConfig = {
  none: {
    label: 'None',
    color: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
    icon: CheckCircle
  },
  low: {
    label: 'LOW',
    color: 'bg-success/10 text-green-600 dark:text-green-400 border-green-500/20',
    icon: CheckCircle
  },
  medium: {
    label: 'MED',
    color: 'bg-warning/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    icon: AlertCircle
  },
  high: {
    label: 'HIGH',
    color: 'bg-danger/10 text-red-600 dark:text-red-400 border-red-500/20',
    icon: AlertTriangle
  },
  critical: {
    label: 'CRITICAL',
    color: 'bg-red-600 text-white border-red-600',
    icon: XCircle
  }
};

export default function RiskBadge({ level, showIcon = true, className = '' }) {
  const config = riskConfig[level] || riskConfig.low;
  const Icon = config.icon;

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border uppercase ${config.color} ${className}`}
    >
      {showIcon && <Icon className="w-3 h-3 mr-1.5" />}
      {config.label}
    </motion.span>
  );
}
