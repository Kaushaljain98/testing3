import { motion } from 'framer-motion';
import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { Warehouse, Thermometer, Shield, TrendingUp, AlertTriangle, X } from 'lucide-react';
import Modal from '../../components/shared/Modal';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function ColdStorageMap() {
  const [selectedHub, setSelectedHub] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [popupHub, setPopupHub] = useState(null);

  function handleMoveEnd(position) {
    setPosition(position);
    setIsDragging(false);
  }

  const hubs = [
    {
      id: 'hub-1',
      name: 'New York Cold Hub',
      coordinates: [-74, 40.7],
      capacity: 85,
      status: 'limited',
      tempClasses: ['2-8°C', '-20°C', '-70°C'],
      certifications: ['GDP', 'WHO PQS'],
      city: 'New York, USA'
    },
    {
      id: 'hub-2',
      name: 'Frankfurt BioCenter',
      coordinates: [8.68, 50.11],
      capacity: 42,
      status: 'available',
      tempClasses: ['2-8°C', '-20°C', '-70°C'],
      certifications: ['GDP', 'ISO 9001'],
      city: 'Frankfurt, Germany'
    },
    {
      id: 'hub-3',
      name: 'Singapore ColdPort',
      coordinates: [103.85, 1.35],
      capacity: 98,
      status: 'full',
      tempClasses: ['2-8°C', '-20°C'],
      certifications: ['GDP', 'IATA CEIV'],
      city: 'Singapore'
    },
    {
      id: 'hub-4',
      name: 'Tokyo Pharma Hub',
      coordinates: [139.69, 35.68],
      capacity: 67,
      status: 'available',
      tempClasses: ['2-8°C', '-20°C', '-70°C'],
      certifications: ['GDP', 'PMDA'],
      city: 'Tokyo, Japan'
    },
    {
      id: 'hub-5',
      name: 'Dubai Med Logistics',
      coordinates: [55.27, 25.20],
      capacity: 55,
      status: 'available',
      tempClasses: ['2-8°C', '-20°C'],
      certifications: ['GDP', 'DHA'],
      city: 'Dubai, UAE'
    },
    {
      id: 'hub-6',
      name: 'São Paulo BioHub',
      coordinates: [-46.63, -23.55],
      capacity: 73,
      status: 'limited',
      tempClasses: ['2-8°C'],
      certifications: ['GDP', 'ANVISA'],
      city: 'São Paulo, Brazil'
    },
    {
      id: 'hub-7',
      name: 'Mumbai Cold Chain',
      coordinates: [72.88, 19.08],
      capacity: 91,
      status: 'full',
      tempClasses: ['2-8°C', '-20°C'],
      certifications: ['GDP', 'CDSCO'],
      city: 'Mumbai, India'
    },
    {
      id: 'hub-8',
      name: 'Sydney BioPark',
      coordinates: [151.21, -33.87],
      capacity: 38,
      status: 'available',
      tempClasses: ['2-8°C', '-20°C', '-70°C'],
      certifications: ['GDP', 'TGA'],
      city: 'Sydney, Australia'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return { fill: 'rgb(16, 185, 129)', text: 'text-success' };
      case 'limited': return { fill: 'rgb(245, 158, 11)', text: 'text-warning' };
      case 'full': return { fill: 'rgb(239, 68, 68)', text: 'text-danger' };
      default: return { fill: 'rgb(100, 116, 139)', text: 'text-muted' };
    }
  };

  const handleHubClick = (hub) => {
    setPopupHub(hub);
  };

  const handleHubCardClick = (hub) => {
    setSelectedHub(hub);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-primary mb-2"
          >
            Global Cold Storage Network
          </motion.h1>
          <p className="text-secondary">Interactive map of cold storage facilities worldwide</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-sm font-semibold text-primary">Available</span>
          </div>
          <div className="text-2xl font-bold text-primary">
            {hubs.filter(h => h.status === 'available').length}
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-warning rounded-full" />
            <span className="text-sm font-semibold text-primary">Limited</span>
          </div>
          <div className="text-2xl font-bold text-primary">
            {hubs.filter(h => h.status === 'limited').length}
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-danger rounded-full" />
            <span className="text-sm font-semibold text-primary">Full</span>
          </div>
          <div className="text-2xl font-bold text-primary">
            {hubs.filter(h => h.status === 'full').length}
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Warehouse className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-primary">Total Hubs</span>
          </div>
          <div className="text-2xl font-bold text-primary">{hubs.length}</div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="relative h-[600px] rounded-lg overflow-hidden" style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
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
                      style={{
                        hover: {
                          fill: 'rgb(var(--accent))',
                          opacity: 0.3
                        }
                      }}
                    />
                  ))
                }
              </Geographies>
              {hubs.map((hub) => {
                const statusColor = getStatusColor(hub.status);
                return (
                  <Marker
                    key={hub.id}
                    coordinates={hub.coordinates}
                    onClick={() => handleHubClick(hub)}
                  >
                    <g className="cursor-pointer">
                      <circle
                        r={8}
                        fill={statusColor.fill}
                        stroke="white"
                        strokeWidth={2}
                        className="hover:r-10 transition-all"
                      />
                      <circle
                        r={12}
                        fill={statusColor.fill}
                        opacity={0.3}
                        className="animate-pulse"
                      />
                    </g>
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>

          {popupHub && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface border-2 border-border rounded-xl p-4 shadow-2xl z-50 min-w-[300px]">
              <button
                onClick={() => setPopupHub(null)}
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-border transition-colors"
              >
                <X className="w-4 h-4 text-secondary" />
              </button>
              <h3 className="text-lg font-bold text-primary mb-1">{popupHub.name}</h3>
              <p className="text-sm text-secondary mb-3">{popupHub.city}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary">Utilization</span>
                  <span className={`text-sm font-bold ${getStatusColor(popupHub.status).text}`}>
                    {popupHub.capacity}%
                  </span>
                </div>
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${popupHub.capacity}%`,
                      backgroundColor: getStatusColor(popupHub.status).fill
                    }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="text-xs text-secondary mb-1">Temperature Classes</div>
                <div className="flex flex-wrap gap-1">
                  {popupHub.tempClasses.map((temp, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-accent/10 border border-accent/30 rounded text-xs font-mono text-accent">
                      {temp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-secondary mb-3">
                Contact: <span className="text-primary font-medium">Available 24/7</span>
              </div>

              <button
                onClick={() => {
                  setPopupHub(null);
                  handleHubCardClick(popupHub);
                }}
                className="w-full px-3 py-2 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-sm"
              >
                View Details
              </button>
            </div>
          )}

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

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hubs.map((hub, i) => {
          const statusColor = getStatusColor(hub.status);
          return (
            <motion.div
              key={hub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleHubCardClick(hub)}
              className="bg-surface border border-border rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-primary text-sm mb-1">{hub.name}</h3>
                  <p className="text-xs text-secondary">{hub.city}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${statusColor.fill}`} style={{ backgroundColor: statusColor.fill }} />
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted">Capacity</span>
                  <span className={`font-semibold ${statusColor.text}`}>{hub.capacity}%</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {hub.tempClasses.map((temp, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-accent/10 border border-accent/30 rounded text-xs font-mono text-accent">
                      {temp}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {showModal && selectedHub && (
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedHub(null);
          }}
          title={selectedHub.name}
        >
          <div className="space-y-6">
            <div>
              <div className="text-sm text-secondary mb-1">Location</div>
              <div className="text-lg font-semibold text-primary">{selectedHub.city}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-secondary mb-1">Capacity</div>
                <div className="text-2xl font-bold text-primary">{selectedHub.capacity}%</div>
                <div className={`text-xs font-semibold ${getStatusColor(selectedHub.status).text} capitalize`}>
                  {selectedHub.status}
                </div>
              </div>
              <div>
                <div className="text-sm text-secondary mb-1">Status</div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                  selectedHub.status === 'available' ? 'bg-success/10 border border-success/30' :
                  selectedHub.status === 'limited' ? 'bg-warning/10 border border-warning/30' :
                  'bg-danger/10 border border-danger/30'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    selectedHub.status === 'available' ? 'bg-success' :
                    selectedHub.status === 'limited' ? 'bg-warning' :
                    'bg-danger'
                  }`} />
                  <span className={`text-sm font-semibold capitalize ${getStatusColor(selectedHub.status).text}`}>
                    {selectedHub.status}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-secondary mb-2">Supported Temperature Classes</div>
              <div className="flex flex-wrap gap-2">
                {selectedHub.tempClasses.map((temp, idx) => (
                  <div key={idx} className="px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-lg">
                    <span className="text-sm font-mono font-semibold text-accent">{temp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm text-secondary mb-2">Certifications</div>
              <div className="flex flex-wrap gap-2">
                {selectedHub.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <Shield className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedHub.status !== 'full' && (
              <div className="bg-accent/5 border border-accent/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-primary mb-2">Emergency Transfer</h4>
                <p className="text-xs text-secondary mb-4">
                  Priority capacity allocation available for critical shipments
                </p>
                <button className="px-4 py-2 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-sm">
                  Request Emergency Transfer
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
