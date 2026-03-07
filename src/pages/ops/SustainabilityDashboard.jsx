import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Leaf, TrendingDown, Award } from 'lucide-react';

export default function SustainabilityDashboard() {
  const monthlyEmissions = [
    { month: 'Jan', emissions: 145 },
    { month: 'Feb', emissions: 132 },
    { month: 'Mar', emissions: 158 },
    { month: 'Apr', emissions: 127 },
    { month: 'May', emissions: 115 },
    { month: 'Jun', emissions: 108 }
  ];

  const emissionsByMode = [
    { mode: 'Air', emissions: 120, color: 'rgb(239, 68, 68)' },
    { mode: 'Sea', emissions: 28, color: 'rgb(34, 197, 94)' },
    { mode: 'Road', emissions: 65, color: 'rgb(245, 158, 11)' },
    { mode: 'Rail', emissions: 40, color: 'rgb(59, 130, 246)' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-primary mb-2"
        >
          Sustainability Dashboard
        </motion.h1>
        <p className="text-secondary">Track carbon emissions and environmental impact</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-semibold text-secondary">Total Emissions (Jun)</span>
          </div>
          <div className="text-3xl font-bold text-primary">108 tons CO₂</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">-6% vs last month</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-secondary">6-Month Trend</span>
          </div>
          <div className="text-3xl font-bold text-primary">-26%</div>
          <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">Reduction achieved</div>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-semibold text-secondary">Carbon Savings</span>
          </div>
          <div className="text-3xl font-bold text-primary">42 tons</div>
          <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">Via route optimization</div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-primary mb-6">Total CO₂ Emissions by Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyEmissions}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
            <XAxis dataKey="month" stroke="rgb(var(--text-secondary))" />
            <YAxis stroke="rgb(var(--text-secondary))" label={{ value: 'Tons CO₂', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(var(--surface))',
                border: '1px solid rgb(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Line type="monotone" dataKey="emissions" stroke="rgb(16, 185, 129)" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-primary mb-6">Emissions Breakdown by Transport Mode</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={emissionsByMode}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
            <XAxis dataKey="mode" stroke="rgb(var(--text-secondary))" />
            <YAxis stroke="rgb(var(--text-secondary))" label={{ value: 'kg CO₂ per shipment', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(var(--surface))',
                border: '1px solid rgb(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="emissions" fill="rgb(var(--accent))" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border border-emerald-500/30 rounded-xl p-8">
        <h2 className="text-xl font-semibold text-primary mb-6">Route Comparison Example</h2>
        <p className="text-secondary mb-6">
          By choosing optimal routes, we help reduce carbon emissions significantly
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/50 dark:bg-black/30 border border-emerald-500/30 rounded-lg p-6">
            <div className="text-sm text-secondary mb-2">Option A: Air Route</div>
            <div className="text-3xl font-bold text-danger mb-1">120 kg CO₂</div>
            <div className="text-xs text-secondary">High emissions</div>
          </div>
          <div className="bg-white/50 dark:bg-black/30 border border-emerald-500/30 rounded-lg p-6">
            <div className="text-sm text-secondary mb-2">Option B: Rail Route</div>
            <div className="text-3xl font-bold text-success mb-1">40 kg CO₂</div>
            <div className="text-xs text-secondary">Low emissions</div>
          </div>
          <div className="bg-emerald-500/20 border-2 border-emerald-500 rounded-lg p-6">
            <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-2">Carbon Savings</div>
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">80 kg CO₂</div>
            <div className="text-xs text-emerald-700 dark:text-emerald-300">67% reduction</div>
          </div>
        </div>
      </div>
    </div>
  );
}
