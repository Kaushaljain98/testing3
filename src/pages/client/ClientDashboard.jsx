import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, FileText, TrendingUp, MapPin } from 'lucide-react';
import KPICard from '../../components/shared/KPICard';
import StatusPill from '../../components/shared/StatusPill';
import TempPill from '../../components/shared/TempPill';
import TenantBadge from '../../components/shared/TenantBadge';
import { useAuth } from '../../context/AuthContext';
import { shipments } from '../../data/shipments';
import { alerts } from '../../data/alerts';
import { tenants } from '../../data/tenants';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function ClientDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const tenant = tenants.find(t => t.id === currentUser?.tenantId);
  const myShipments = shipments.filter(s => s.tenantId === currentUser?.tenantId);
  const activeShipments = myShipments.filter(s => s.status === 'in_transit');
  const recentShipments = myShipments.slice(0, 5);
  const myAlerts = alerts.filter(a => a.tenantId === currentUser?.tenantId && !a.acknowledged).slice(0, 3);

  const nextDelivery = activeShipments.length > 0 ? activeShipments[0] : null;
  const tempCompliance = 100;
  const pendingApprovals = 2;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-primary mb-2"
          >
            Welcome back, {currentUser?.name?.split(' ')[0]}
          </motion.h1>
          <TenantBadge tenant={tenant} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          icon={Package}
          label="Active Shipments"
          value={activeShipments.length}
          delay={0}
        />
        <KPICard
          icon={Clock}
          label="Next Delivery ETA"
          value={nextDelivery ? new Date(nextDelivery.eta).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}
          format="string"
          delay={1}
        />
        <KPICard
          icon={CheckCircle}
          label="Temp Compliance"
          value={`${tempCompliance}%`}
          format="string"
          change="+2.1%"
          trend="up"
          delay={2}
        />
        <KPICard
          icon={FileText}
          label="Pending Approvals"
          value={pendingApprovals}
          delay={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-primary">Recent Shipments</h2>
              <button
                onClick={() => navigate('/client/shipments')}
                className="text-sm text-accent hover:underline"
              >
                View all
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 text-sm font-semibold text-secondary">ID</th>
                    <th className="pb-3 text-sm font-semibold text-secondary">Route</th>
                    <th className="pb-3 text-sm font-semibold text-secondary">Mode</th>
                    <th className="pb-3 text-sm font-semibold text-secondary">Temperature</th>
                    <th className="pb-3 text-sm font-semibold text-secondary">Status</th>
                    <th className="pb-3 text-sm font-semibold text-secondary">ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {recentShipments.map((shipment, i) => (
                    <motion.tr
                      key={shipment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border last:border-0 hover:bg-border/50 cursor-pointer"
                      onClick={() => navigate(`/shipments/track/${shipment.id}`)}
                    >
                      <td className="py-4 text-sm font-mono text-primary">{shipment.id}</td>
                      <td className="py-4 text-sm text-secondary">
                        {shipment.origin.code} → {shipment.destination.code}
                      </td>
                      <td className="py-4">
                        <span className="text-sm capitalize text-secondary">{shipment.mode}</span>
                      </td>
                      <td className="py-4">
                        <TempPill temp={shipment.currentTemp} tempClass={shipment.tempClass} />
                      </td>
                      <td className="py-4">
                        <StatusPill status={shipment.status} />
                      </td>
                      <td className="py-4 text-sm text-secondary">
                        {new Date(shipment.eta).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/procurement')}
                className="p-4 bg-accent/10 hover:bg-accent/20 border border-accent/20 rounded-xl text-left transition-colors group"
              >
                <Package className="w-6 h-6 text-accent mb-2" />
                <div className="font-semibold text-primary">New Procurement Request</div>
                <div className="text-xs text-secondary mt-1">Order materials</div>
              </button>
              <button
                onClick={() => navigate('/client/shipments')}
                className="p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl text-left transition-colors group"
              >
                <MapPin className="w-6 h-6 text-blue-500 mb-2" />
                <div className="font-semibold text-primary">Track Shipment</div>
                <div className="text-xs text-secondary mt-1">Real-time location</div>
              </button>
              <button
                onClick={() => navigate('/compliance')}
                className="p-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-left transition-colors group"
              >
                <FileText className="w-6 h-6 text-emerald-500 mb-2" />
                <div className="font-semibold text-primary">Download Documents</div>
                <div className="text-xs text-secondary mt-1">Compliance docs</div>
              </button>
              <button className="p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-left transition-colors group">
                <TrendingUp className="w-6 h-6 text-red-500 mb-2" />
                <div className="font-semibold text-primary">Emergency Mode</div>
                <div className="text-xs text-secondary mt-1">Priority routing</div>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Compliance Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary">Docs Ready</span>
                <span className="text-lg font-bold text-success">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary">Pending</span>
                <span className="text-lg font-bold text-warning">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary">Expiring Soon</span>
                <span className="text-lg font-bold text-danger">1</span>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              {myAlerts.length > 0 ? (
                myAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.severity === 'critical'
                        ? 'bg-red-500/5 border-red-500'
                        : alert.severity === 'warning'
                        ? 'bg-amber-500/5 border-amber-500'
                        : 'bg-blue-500/5 border-blue-500'
                    }`}
                  >
                    <div className="text-sm font-medium text-primary mb-1">{alert.title}</div>
                    <div className="text-xs text-secondary">{alert.description}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted text-center py-4">No recent alerts</div>
              )}
            </div>
            <button
              onClick={() => navigate('/alerts')}
              className="w-full mt-4 py-2 text-sm text-accent hover:underline"
            >
              View all alerts
            </button>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">My Materials</h3>
            <div className="text-sm text-secondary">
              <div className="flex justify-between py-2">
                <span>Pending Orders</span>
                <span className="font-semibold text-primary">3</span>
              </div>
              <div className="flex justify-between py-2">
                <span>In Transit</span>
                <span className="font-semibold text-primary">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Shipment Map</h2>
        <div className="h-96 bg-background rounded-lg overflow-hidden">
          <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140 }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="rgb(var(--border))"
                    stroke="rgb(var(--background))"
                    strokeWidth={0.5}
                  />
                ))
              }
            </Geographies>
            {activeShipments.map((shipment) => (
              <g key={shipment.id}>
                <Line
                  from={[shipment.origin.lng, shipment.origin.lat]}
                  to={[shipment.destination.lng, shipment.destination.lat]}
                  stroke="rgb(14, 165, 233)"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeDasharray="5,5"
                  opacity={0.6}
                />
                <Marker coordinates={[shipment.origin.lng, shipment.origin.lat]}>
                  <circle r={4} fill="rgb(16, 185, 129)" />
                </Marker>
                <Marker coordinates={[shipment.destination.lng, shipment.destination.lat]}>
                  <circle r={4} fill="rgb(14, 165, 233)" />
                </Marker>
              </g>
            ))}
          </ComposableMap>
        </div>
      </div>
    </div>
  );
}
