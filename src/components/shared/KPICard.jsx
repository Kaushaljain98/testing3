import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function KPICard({
  icon: Icon,
  label,
  value,
  change,
  trend,
  format = 'number',
  delay = 0,
  className = ''
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (format === 'number' && typeof value === 'number') {
      let start = 0;
      const duration = 1000;
      const increment = value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value, format]);

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (!trend || trend === 'neutral') return 'text-secondary';
    return trend === 'up' ? 'text-success' : 'text-danger';
  };

  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: delay * 0.06, duration: 0.3 }}
      className={`bg-surface border border-border rounded-xl p-6 hover:shadow-lg transition-shadow ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        {Icon && (
          <div className="p-2 bg-accent/10 rounded-lg">
            <Icon className="w-5 h-5 text-accent" />
          </div>
        )}
        {change && (
          <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-3xl font-bold text-primary">
          {format === 'number' ? displayValue.toLocaleString() : displayValue}
        </div>
        <div className="text-sm text-secondary font-medium">{label}</div>
      </div>
    </motion.div>
  );
}
