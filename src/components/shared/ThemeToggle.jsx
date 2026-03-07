import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg hover:bg-border transition-colors ${className}`}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-secondary" />
        ) : (
          <Sun className="w-5 h-5 text-secondary" />
        )}
      </motion.div>
    </button>
  );
}
