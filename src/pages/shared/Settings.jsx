import { motion } from 'framer-motion';
import { User, Building2, Bell, Palette } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../../components/shared/ThemeToggle';
import { useState } from 'react';

export default function Settings() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'organization', label: 'Organization', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-primary"
      >
        Settings
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-surface border border-border rounded-xl p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-accent text-white'
                      : 'text-secondary hover:bg-border hover:text-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="lg:col-span-3 bg-surface border border-border rounded-xl p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={currentUser?.name}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={currentUser?.email}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Role</label>
                  <input
                    type="text"
                    value={currentUser?.role.replace(/_/g, ' ').toUpperCase()}
                    disabled
                    className="w-full px-4 py-3 bg-border border border-border rounded-lg text-muted"
                  />
                </div>
                <button className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'organization' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary">Organization Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Organization Name</label>
                  <input
                    type="text"
                    defaultValue={currentUser?.tenantName}
                    disabled
                    className="w-full px-4 py-3 bg-border border border-border rounded-lg text-muted"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">API Key</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value="••••••••••••••••••••••••"
                      disabled
                      className="flex-1 px-4 py-3 bg-border border border-border rounded-lg text-muted font-mono"
                    />
                    <button className="px-4 py-3 bg-border text-primary rounded-lg hover:bg-border/80 transition-colors">
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: 'Temperature Alerts', description: 'Receive alerts when temperature excursions occur' },
                  { label: 'Customs Updates', description: 'Notifications about customs clearance status' },
                  { label: 'Delivery Notifications', description: 'Get notified when shipments are delivered' },
                  { label: 'System Updates', description: 'Important system and maintenance notifications' }
                ].map((item) => (
                  <div key={item.label} className="flex items-start justify-between p-4 bg-background rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-primary">{item.label}</div>
                      <div className="text-sm text-secondary mt-1">{item.description}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-border rounded-full peer peer-checked:bg-accent transition-colors"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary">Appearance</h2>
              <div className="space-y-4">
                <div className="p-4 bg-background rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-primary">Theme</div>
                      <div className="text-sm text-secondary mt-1">Choose light or dark mode</div>
                    </div>
                    <ThemeToggle />
                  </div>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="font-medium text-primary mb-3">Density</div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="px-4 py-3 bg-accent text-white rounded-lg">
                      Comfortable
                    </button>
                    <button className="px-4 py-3 bg-border text-primary rounded-lg hover:bg-border/80 transition-colors">
                      Compact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
