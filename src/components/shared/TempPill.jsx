import { Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TempPill({ temp, tempClass, showIcon = true, className = '' }) {
  const getTempColor = () => {
    if (!temp) return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20';

    const ranges = {
      '2-8°C': { min: 2, max: 8 },
      '-20°C': { min: -25, max: -15 },
      '-70°C': { min: -80, max: -60 }
    };

    const range = ranges[tempClass];
    if (!range) return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';

    if (temp < range.min || temp > range.max) {
      return 'bg-danger/10 text-red-600 dark:text-red-400 border-red-500/20';
    }

    const midpoint = (range.min + range.max) / 2;
    const variance = Math.abs(temp - midpoint);
    const maxVariance = (range.max - range.min) / 2;

    if (variance > maxVariance * 0.6) {
      return 'bg-warning/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    }

    return 'bg-success/10 text-green-600 dark:text-green-400 border-green-500/20';
  };

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${getTempColor()} ${className}`}
    >
      {showIcon && <Thermometer className="w-3 h-3 mr-1.5" />}
      {temp ? `${temp > 0 ? '+' : ''}${temp.toFixed(1)}°C` : 'N/A'}
    </motion.span>
  );
}
