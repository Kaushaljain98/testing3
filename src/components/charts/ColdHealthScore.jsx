import { motion } from 'framer-motion';

export default function ColdHealthScore({ score, size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40'
  };

  const getColor = () => {
    if (score >= 90) return 'rgb(16, 185, 129)';
    if (score >= 70) return 'rgb(245, 158, 11)';
    return 'rgb(239, 68, 68)';
  };

  const getLabel = () => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="45"
            stroke="rgb(var(--border))"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="45"
            stroke={getColor()}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              strokeDasharray: circumference
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="text-3xl font-bold text-primary font-mono"
          >
            {score}
          </motion.div>
          <div className="text-xs text-secondary font-medium">{getLabel()}</div>
        </div>
      </div>
    </div>
  );
}
