import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { shipments } from '../../data/shipments';
import { TrendingUp, Package, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AnalyticsDashboard() {
  const modeData = [
    { mode: 'Air', count: shipments.filter(s => s.mode === 'air').length },
    { mode: 'Sea', count: shipments.filter(s => s.mode === 'sea').length },
    { mode: 'Road', count: shipments.filter(s => s.mode === 'road').length },
    { mode: 'Rail', count: shipments.filter(s => s.mode === 'rail').length }
  ];

  const monthlyData = [
    { month: 'Jan', shipments: 45 },
    { month: 'Feb', shipments: 52 },
    { month: 'Mar', shipments: 48 },
    { month: 'Apr', shipments: 61 },
    { month: 'May', shipments: 55 },
    { month: 'Jun', shipments: 67 }
  ];

  const complianceData = [
    { name: 'Compliant', value: 94, color: 'rgb(16, 185, 129)' },
    { name: 'Non-Compliant', value: 6, color: 'rgb(239, 68, 68)' }
  ];

  const delayData = [
    { name: 'On Time', value: 78, color: 'rgb(16, 185, 129)' },
    { name: 'Delayed', value: 22, color: 'rgb(245, 158, 11)' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-primary mb-2"
        >
          Analytics Dashboard
        </motion.h1>
        <p className="text-secondary">Operational insights and performance metrics</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-secondary">Total Shipments</span>
          </div>
          <div className="text-3xl font-bold text-primary">{shipments.length}</div>
          <div className="text-xs text-success mt-1">+12% vs last month</div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <span className="text-sm font-semibold text-secondary">Temp Compliance</span>
          </div>
          <div className="text-3xl font-bold text-success">94%</div>
          <div className="text-xs text-success mt-1">+2% vs last month</div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-secondary">On-Time Rate</span>
          </div>
          <div className="text-3xl font-bold text-primary">78%</div>
          <div className="text-xs text-warning mt-1">-3% vs last month</div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <span className="text-sm font-semibold text-secondary">Active Alerts</span>
          </div>
          <div className="text-3xl font-bold text-warning">12</div>
          <div className="text-xs text-danger mt-1">+4 since yesterday</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-primary mb-6">Shipments by Transport Mode</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis dataKey="mode" stroke="rgb(var(--text-secondary))" />
              <YAxis stroke="rgb(var(--text-secondary))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgb(var(--surface))',
                  border: '1px solid rgb(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="rgb(var(--accent))" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-primary mb-6">Monthly Shipment Volume</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis dataKey="month" stroke="rgb(var(--text-secondary))" />
              <YAxis stroke="rgb(var(--text-secondary))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgb(var(--surface))',
                  border: '1px solid rgb(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="shipments" stroke="rgb(var(--accent))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-primary mb-6">Temperature Compliance Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={complianceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {complianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-primary mb-6">Delivery Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={delayData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {delayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
