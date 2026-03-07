import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, Plane, Ship, Brain as Train, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShipments } from '../../hooks/useShipments';
import StatusPill from '../../components/shared/StatusPill';
import TempPill from '../../components/shared/TempPill';
import RiskBadge from '../../components/shared/RiskBadge';
import TenantBadge from '../../components/shared/TenantBadge';
import LoadingSkeleton from '../../components/shared/LoadingSkeleton';

export default function ShipmentsByMode() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { shipments: allShipments } = useShipments();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  setTimeout(() => setLoading(false), 400);

  const shipments = allShipments.filter(s => s.mode === mode);
  const totalPages = Math.ceil(shipments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentShipments = shipments.slice(startIndex, endIndex);

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'air': return Plane;
      case 'sea': return Ship;
      case 'rail': return Train;
      case 'road': return Truck;
      default: return Package;
    }
  };

  const getModeColor = (mode) => {
    switch (mode) {
      case 'air': return 'from-sky-500 to-blue-600';
      case 'sea': return 'from-blue-500 to-cyan-600';
      case 'rail': return 'from-purple-500 to-pink-600';
      case 'road': return 'from-emerald-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const ModeIcon = getModeIcon(mode);

  const handleRowClick = (shipmentId) => {
    navigate(`/shipments/track/${shipmentId}`);
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
            className="text-3xl font-bold text-primary mb-2 flex items-center gap-3"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getModeColor(mode)} flex items-center justify-center shadow-lg`}>
              <ModeIcon className="w-6 h-6 text-white" />
            </div>
            {mode.charAt(0).toUpperCase() + mode.slice(1)} Shipments
          </motion.h1>
          <p className="text-secondary">All shipments using {mode} transport</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-surface border border-border rounded-lg">
            <span className="text-sm text-secondary">Total: </span>
            <span className="text-lg font-bold text-primary">{shipments.length}</span>
          </div>
        </div>
      </div>

      {shipments.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-12 text-center">
          <ModeIcon className="w-16 h-16 text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary mb-2">No {mode} shipments found</h3>
          <p className="text-secondary">There are currently no shipments using {mode} transport.</p>
        </div>
      ) : (
        <>
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left bg-background">
                    <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase">Shipment ID</th>
                    <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase">Tenant</th>
                    <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase">Origin</th>
                    <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase">Destination</th>
                    <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase">Carrier</th>
                    <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase">Temp Class</th>
                    <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase">Current Temp</th>
                    <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase">Risk</th>
                    <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase">ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {currentShipments.map((shipment, i) => (
                    <motion.tr
                      key={shipment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => handleRowClick(shipment.id)}
                      className="border-b border-border last:border-0 hover:bg-border/50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono font-semibold text-primary">{shipment.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <TenantBadge tenantId={shipment.tenantId} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-primary font-medium">{shipment.origin.city}</div>
                        <div className="text-xs text-muted font-mono">{shipment.origin.code}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-primary font-medium">{shipment.destination.city}</div>
                        <div className="text-xs text-muted font-mono">{shipment.destination.code}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-secondary">{shipment.carrier}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono text-primary">{shipment.tempClass}</span>
                      </td>
                      <td className="px-6 py-4">
                        <TempPill temp={shipment.currentTemp} tempClass={shipment.tempClass} showIcon={false} />
                      </td>
                      <td className="px-6 py-4">
                        <StatusPill status={shipment.status} />
                      </td>
                      <td className="px-6 py-4">
                        <RiskBadge level={shipment.riskLevel} showIcon={false} />
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-secondary">
                          {new Date(shipment.eta).toLocaleDateString()}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-secondary">
                Showing {startIndex + 1} to {Math.min(endIndex, shipments.length)} of {shipments.length} shipments
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-surface border border-border rounded-lg hover:bg-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-primary" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-accent text-white'
                          : 'bg-surface border border-border text-primary hover:bg-border'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-surface border border-border rounded-lg hover:bg-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
