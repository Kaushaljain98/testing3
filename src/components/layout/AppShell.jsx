import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppShell({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto scrollbar-thin p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
