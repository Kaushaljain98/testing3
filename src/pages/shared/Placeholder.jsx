import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

export default function Placeholder({ title, description }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-accent" />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-3">{title}</h1>
        <p className="text-secondary max-w-md mx-auto">{description}</p>
      </motion.div>
    </div>
  );
}
