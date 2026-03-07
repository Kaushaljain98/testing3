import { motion } from 'framer-motion';
import { useState } from 'react';
import { Package, AlertTriangle, TrendingDown, TrendingUp, Warehouse } from 'lucide-react';
import { materials } from '../../data/materials';
import LoadingSkeleton from '../../components/shared/LoadingSkeleton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function InventoryDashboard() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => setLoading(false), 400);

  const inventory = materials.map(material => ({
    ...material,
    currentStock: material.quantity,
    minStock: Math.floor(material.quantity * 0.3),
    facility: 'Cold Hub ' + (Math.floor(Math.random() * 5) + 1),
    status: material.quantity > material.quantity * 0.5 ? 'in_stock' :
            material.quantity > material.quantity * 0.3 ? 'low_stock' : 'out_of_stock'
  }));

  const stockTrendData = [
    { month: 'Jan', stock: 85 },
    { month: 'Feb', stock: 78 },
    { month: 'Mar', stock: 82 },
    { month: 'Apr', stock: 75 },
    { month: 'May', stock: 88 },
    { month: 'Jun', stock: 92 }
  ];

  const inStockCount = inventory.filter(i => i.status === 'in_stock').length;
  const lowStockCount = inventory.filter(i => i.status === 'low_stock').length;
  const outOfStockCount = inventory.filter(i => i.status === 'out_of_stock').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in_stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-success/10 border border-success/30 rounded-full text-xs font-semibold text-success">
            In Stock
          </span>
        );
      case 'low_stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-warning/10 border border-warning/30 rounded-full text-xs font-semibold text-warning">
            <AlertTriangle className="w-3 h-3" />
            Low Stock
          </span>
        );
      case 'out_of_stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-danger/10 border border-danger/30 rounded-full text-xs font-semibold text-danger">
            Out of Stock
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-primary mb-2"
          >
            Inventory Dashboard
          </motion.h1>
          <p className="text-secondary">Monitor stock levels across all facilities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-secondary">Total Items</span>
          </div>
          <div className="text-3xl font-bold text-primary">{inventory.length}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-success" />
            <span className="text-sm font-semibold text-secondary">In Stock</span>
          </div>
          <div className="text-3xl font-bold text-success">{inStockCount}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <span className="text-sm font-semibold text-secondary">Low Stock</span>
          </div>
          <div className="text-3xl font-bold text-warning">{lowStockCount}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-5 h-5 text-danger" />
            <span className="text-sm font-semibold text-secondary">Out of Stock</span>
          </div>
          <div className="text-3xl font-bold text-danger">{outOfStockCount}</div>
        </motion.div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-primary mb-6">Stock Trend (6 Months)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stockTrendData}>
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
            <Line type="monotone" dataKey="stock" stroke="rgb(var(--accent))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-primary">Inventory Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase">Material ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase">Temp Class</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase">Current Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase">Min Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase">Facility</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, i) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-border/50"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-primary">{item.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-primary">{item.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-secondary">{item.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-primary">{item.tempClass}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-primary">
                      {item.currentStock} {item.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-secondary">
                      {item.minStock} {item.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-secondary">{item.facility}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(item.status)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
