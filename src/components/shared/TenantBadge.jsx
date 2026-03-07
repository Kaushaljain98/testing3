import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const tenantColors = {
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  sky: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30'
};

export default function TenantBadge({ tenant, showLock = true, className = '' }) {
  if (!tenant) return null;
  const colorClass = tenantColors[tenant.color] || tenantColors.blue;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${colorClass} ${className}`}
    >
      {showLock && <Lock className="w-3.5 h-3.5 mr-2" />}
      {tenant.name || tenant}
    </motion.div>
  );
}
