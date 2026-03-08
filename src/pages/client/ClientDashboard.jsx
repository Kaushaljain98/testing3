import { motion } from 'framer-motion';
import { useState } from 'react';
import { Package, Clock, CheckCircle, FileText, TrendingUp, MapPin, UserPlus, Users, Send, XCircle } from 'lucide-react';
import KPICard from '../../components/shared/KPICard';
import StatusPill from '../../components/shared/StatusPill';
import TempPill from '../../components/shared/TempPill';
import TenantBadge from '../../components/shared/TenantBadge';
import { useAuth } from '../../context/AuthContext';
import { shipments } from '../../data/shipments';
import { alerts } from '../../data/alerts';
import { tenants } from '../../data/tenants';
import { useNavigate } from 'react-router-dom';
import { registrationRequests, addRequest } from '../../data/registrationRequests';
import { useToast } from '../../context/ToastContext';
import { ComposableMap, Geographies, Geography, Line, Marker, ZoomableGroup } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function ClientDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [requestForm, setRequestForm] = useState({
    name: '', email: '', jobTitle: '', role: 'client_user', reason: ''
  });
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  function handleMoveEnd(position) {
    setPosition(position);
    setIsDragging(false);
  }

  const tenant = tenants.find(t => t.id === currentUser?.tenantId);
  const myShipments = shipments.filter(s => s.tenantId === currentUser?.tenantId);
  const activeShipments = myShipments.filter(s => s.status === 'in_transit');
  const recentShipments = myShipments.slice(0, 5);
  const myAlerts = alerts.filter(a => a.tenantId === currentUser?.tenantId && !a.acknowledged).slice(0, 3);

  const nextDelivery = activeShipments.length > 0 ? activeShipments[0] : null;
  const tempCompliance = 100;
  const pendingApprovals = 2;

  const isClientAdmin = currentUser?.role === 'client_admin';
  const myRequests = registrationRequests.filter(
    r => r.tenantId === currentUser?.tenantId
  );

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

      {isClientAdmin && (
        <div className="flex gap-1 bg-surface border border-border rounded-xl p-1 w-fit">
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'team', label: '👥 Team Access' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {tab.label}
              {tab.id === 'team' && myRequests.filter(r => r.status === 'pending').length > 0 && (
                <span className="ml-2 bg-warning text-white text-xs rounded-full px-1.5 py-0.5">
                  {myRequests.filter(r => r.status === 'pending').length}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {(!isClientAdmin || activeTab === 'dashboard') && (
        <>
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
        <div className="relative h-96 bg-background rounded-lg overflow-hidden" style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
          <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140 }}>
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={handleMoveEnd}
              onMoveStart={() => setIsDragging(true)}
              minZoom={1}
              maxZoom={8}
            >
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
            </ZoomableGroup>
          </ComposableMap>
          <div className="absolute bottom-3 right-3 flex flex-col gap-1">
            <button
              onClick={() => setPosition(pos => ({ ...pos, zoom: Math.min(pos.zoom * 1.5, 8) }))}
              className="w-8 h-8 bg-surface border border-border rounded-lg text-primary hover:bg-border transition-colors flex items-center justify-center text-lg font-bold shadow-sm"
            >
              +
            </button>
            <button
              onClick={() => setPosition(pos => ({ ...pos, zoom: Math.max(pos.zoom / 1.5, 1) }))}
              className="w-8 h-8 bg-surface border border-border rounded-lg text-primary hover:bg-border transition-colors flex items-center justify-center text-lg font-bold shadow-sm"
            >
              −
            </button>
            <button
              onClick={() => setPosition({ coordinates: [0, 20], zoom: 1 })}
              className="w-8 h-8 bg-surface border border-border rounded-lg text-secondary hover:bg-border transition-colors flex items-center justify-center shadow-sm"
              title="Reset view"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
        </>
      )}

      {isClientAdmin && activeTab === 'team' && (
        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border flex items-center gap-3">
              <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-primary">
                  Request New User Access
                </h2>
                <p className="text-xs text-secondary">
                  Submit a request to PolarAxis admin
                </p>
              </div>
            </div>

            {requestSubmitted ? (
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-success" />
                </motion.div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Request Submitted!
                </h3>
                <p className="text-sm text-secondary mb-6">
                  PolarAxis admin will review and send an invite
                  link to the user within 1 business day.
                </p>
                <button
                  onClick={() => {
                    setRequestSubmitted(false);
                    setRequestForm({
                      name: '', email: '', jobTitle: '',
                      role: 'client_user', reason: ''
                    });
                  }}
                  className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-secondary mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={requestForm.name}
                      onChange={e => setRequestForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Dr. Jane Smith"
                      className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-secondary mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      value={requestForm.email}
                      onChange={e => setRequestForm(p => ({ ...p, email: e.target.value }))}
                      placeholder={`jane@${tenant?.name?.toLowerCase().replace(/\s/g,'')}.com`}
                      className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-secondary mb-1.5">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      value={requestForm.jobTitle}
                      onChange={e => setRequestForm(p => ({ ...p, jobTitle: e.target.value }))}
                      placeholder="Supply Chain Manager"
                      className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-secondary mb-1.5">
                      Access Role *
                    </label>
                    <select
                      value={requestForm.role}
                      onChange={e => setRequestForm(p => ({ ...p, role: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    >
                      <option value="client_user">Client User</option>
                      <option value="client_admin">Client Admin</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-secondary mb-1.5">
                    Reason for Access *
                  </label>
                  <textarea
                    value={requestForm.reason}
                    onChange={e => setRequestForm(p => ({ ...p, reason: e.target.value }))}
                    placeholder="Briefly explain why this person needs access..."
                    rows={3}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                  />
                </div>

                <button
                  onClick={() => {
                    if (!requestForm.name || !requestForm.email ||
                        !requestForm.jobTitle || !requestForm.reason) {
                      return;
                    }
                    const newRequest = {
                      id: 'req-' + Date.now(),
                      requestedBy: currentUser.email,
                      requestedByName: currentUser.name,
                      tenantId: currentUser.tenantId,
                      tenantName: tenant?.name || '',
                      name: requestForm.name,
                      email: requestForm.email,
                      jobTitle: requestForm.jobTitle,
                      role: requestForm.role,
                      reason: requestForm.reason,
                      createdAt: new Date().toISOString(),
                      status: 'pending'
                    };
                    addRequest(newRequest);
                    setRequestSubmitted(true);
                  }}
                  className="w-full py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  Submit Access Request
                </button>
              </div>
            )}
          </div>

          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border flex items-center gap-3">
              <div className="w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-primary">
                  Request History
                </h2>
                <p className="text-xs text-secondary">
                  {myRequests.length} total · {myRequests.filter(r => r.status === 'pending').length} pending
                </p>
              </div>
            </div>

            <div className="divide-y divide-border">
              {myRequests.length === 0 ? (
                <div className="p-8 text-center">
                  <Users className="w-10 h-10 text-muted mx-auto mb-3" />
                  <p className="text-sm text-secondary">No requests yet</p>
                </div>
              ) : (
                myRequests.map(req => (
                  <div key={req.id} className="p-4 hover:bg-background transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-primary">
                            {req.name}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            req.status === 'pending'
                              ? 'bg-warning/15 text-warning'
                              : req.status === 'approved'
                              ? 'bg-success/15 text-success'
                              : 'bg-danger/15 text-danger'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                        <p className="text-xs text-secondary">{req.email}</p>
                        <p className="text-xs text-muted mt-0.5">
                          {req.jobTitle} · {req.role.replace(/_/g, ' ')}
                        </p>
                        <p className="text-xs text-muted mt-1 italic">
                          "{req.reason}"
                        </p>
                      </div>
                      <div className="text-xs text-muted flex-shrink-0">
                        {new Date(req.createdAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
