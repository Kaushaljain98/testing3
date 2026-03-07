import { motion } from 'framer-motion';
import { useState } from 'react';
import { Building2, Users, Package, HardDrive } from 'lucide-react';
import { tenants } from '../../data/tenants';
import { shipments } from '../../data/shipments';
import { users } from '../../data/users';
import LoadingSkeleton from '../../components/shared/LoadingSkeleton';

export default function TenantManagement() {
  const [loading, setLoading] = useState(true);
  const [selectedTenant, setSelectedTenant] = useState(null);

  setTimeout(() => setLoading(false), 400);

  const tenantsWithStats = tenants.map(tenant => ({
    ...tenant,
    activeShipments: shipments.filter(s => s.tenantId === tenant.id && s.status === 'in_transit').length,
    totalUsers: users.filter(u => u.tenantId === tenant.id).length,
    storageUsage: Math.floor(Math.random() * 80) + 20
  }));

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-primary mb-2"
        >
          Tenant Management
        </motion.h1>
        <p className="text-secondary">Manage organizations and monitor usage</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-primary">All Tenants</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-background">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase">Organization</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase">Plan</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase">Active Shipments</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase">Users</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {tenantsWithStats.map((tenant, i) => (
                  <motion.tr
                    key={tenant.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelectedTenant(tenant)}
                    className="border-b border-border last:border-0 hover:bg-border/50 cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-primary">{tenant.name}</div>
                          <div className="text-xs text-muted">{tenant.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-accent/10 border border-accent/30 rounded-full text-xs font-semibold text-accent capitalize">
                        {tenant.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-primary">{tenant.activeShipments}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-secondary">{tenant.totalUsers}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-success/10 border border-success/30 rounded-full text-xs font-semibold text-success">
                        Active
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-primary mb-6">
            {selectedTenant ? selectedTenant.name : 'Tenant Details'}
          </h2>
          {selectedTenant ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-accent" />
                    <span className="text-xs text-secondary">Active Shipments</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">{selectedTenant.activeShipments}</div>
                </div>
                <div className="bg-background border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-xs text-secondary">Users</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">{selectedTenant.totalUsers}</div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-secondary">Storage Usage</span>
                  <span className="text-sm font-semibold text-primary">{selectedTenant.storageUsage}%</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${selectedTenant.storageUsage}%` }}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-primary mb-3">User List</h3>
                <div className="space-y-2">
                  {users.filter(u => u.tenantId === selectedTenant.id).map(user => (
                    <div key={user.id} className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg">
                      <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-accent">{user.name[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-primary">{user.name}</div>
                        <div className="text-xs text-muted capitalize">{user.role.replace('_', ' ')}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-muted mx-auto mb-4" />
              <p className="text-secondary">Select a tenant to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
