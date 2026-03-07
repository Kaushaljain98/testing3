import { motion } from 'framer-motion';
import { useState } from 'react';
import { Package, MapPin, Thermometer, Route, DollarSign, Clock, Zap, Leaf, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { materials } from '../../data/materials';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

export default function NewLogisticsOrder() {
  const [step, setStep] = useState(1);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [shipmentDetails, setShipmentDetails] = useState({
    origin: '',
    destination: '',
    tempClass: '2-8°C',
    deadline: ''
  });
  const [selectedRoute, setSelectedRoute] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const routes = [
    {
      id: 'route-1',
      mode: 'Air Freight',
      transitTime: '2-3 days',
      cost: 8500,
      riskScore: 12,
      carbon: 120,
      recommended: true
    },
    {
      id: 'route-2',
      mode: 'Sea + Air',
      transitTime: '5-7 days',
      cost: 5200,
      riskScore: 18,
      carbon: 65
    },
    {
      id: 'route-3',
      mode: 'Rail + Road',
      transitTime: '8-10 days',
      cost: 3800,
      riskScore: 25,
      carbon: 40
    },
    {
      id: 'route-4',
      mode: 'Sea Freight',
      transitTime: '12-15 days',
      cost: 2900,
      riskScore: 32,
      carbon: 28
    }
  ];

  const toggleMaterial = (material) => {
    setSelectedMaterials(prev =>
      prev.find(m => m.id === material.id)
        ? prev.filter(m => m.id !== material.id)
        : [...prev, { ...material, qty: 1 }]
    );
  };

  const handleSubmitOrder = () => {
    toast.success('Logistics order created successfully!');
    navigate('/ops/dashboard');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-primary mb-2">Select Materials</h2>
        <p className="text-sm text-secondary">Choose the materials for this shipment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.slice(0, 9).map((material) => (
          <div
            key={material.id}
            onClick={() => toggleMaterial(material)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedMaterials.find(m => m.id === material.id)
                ? 'border-accent bg-accent/5'
                : 'border-border hover:border-accent/50'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-primary text-sm">{material.name}</h3>
                <p className="text-xs text-secondary">{material.category}</p>
              </div>
              {selectedMaterials.find(m => m.id === material.id) && (
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <Thermometer className="w-3 h-3" />
              {material.tempClass}
            </div>
          </div>
        ))}
      </div>

      {selectedMaterials.length > 0 && (
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="text-sm font-semibold text-primary mb-2">
            Selected: {selectedMaterials.length} material(s)
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedMaterials.map(m => (
              <span key={m.id} className="px-3 py-1 bg-accent/10 border border-accent/30 rounded text-xs text-primary">
                {m.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-primary mb-2">Shipment Details</h2>
        <p className="text-sm text-secondary">Enter origin, destination, and requirements</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Origin Location
          </label>
          <input
            type="text"
            value={shipmentDetails.origin}
            onChange={(e) => setShipmentDetails({ ...shipmentDetails, origin: e.target.value })}
            placeholder="City, Country or Facility Code"
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Destination Location
          </label>
          <input
            type="text"
            value={shipmentDetails.destination}
            onChange={(e) => setShipmentDetails({ ...shipmentDetails, destination: e.target.value })}
            placeholder="City, Country or Facility Code"
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Temperature Class
          </label>
          <select
            value={shipmentDetails.tempClass}
            onChange={(e) => setShipmentDetails({ ...shipmentDetails, tempClass: e.target.value })}
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="2-8°C">2-8°C</option>
            <option value="-20°C">-20°C</option>
            <option value="-70°C">-70°C</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Required Delivery Date
          </label>
          <input
            type="date"
            value={shipmentDetails.deadline}
            onChange={(e) => setShipmentDetails({ ...shipmentDetails, deadline: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-primary mb-2">Route Intelligence</h2>
        <p className="text-sm text-secondary">AI-powered route comparison and recommendation</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {routes.map((route) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setSelectedRoute(route)}
            className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all ${
              selectedRoute?.id === route.id
                ? 'border-accent bg-accent/5'
                : 'border-border hover:border-accent/50'
            } ${route.recommended ? 'ring-2 ring-emerald-500/30' : ''}`}
          >
            {route.recommended && (
              <div className="absolute -top-3 left-4 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                RECOMMENDED
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-primary">{route.mode}</h3>
              {selectedRoute?.id === route.id && (
                <CheckCircle className="w-6 h-6 text-accent" />
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Transit Time
                </span>
                <span className="font-semibold text-primary">{route.transitTime}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Est. Cost
                </span>
                <span className="font-bold text-accent">${route.cost.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Risk Score
                </span>
                <span className={`font-semibold ${
                  route.riskScore < 15 ? 'text-success' :
                  route.riskScore < 25 ? 'text-warning' :
                  'text-danger'
                }`}>
                  {route.riskScore}/100
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  Carbon Emissions
                </span>
                <span className="font-semibold text-primary">{route.carbon} kg CO₂</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-primary mb-2">Review & Confirm</h2>
        <p className="text-sm text-secondary">Verify order details before submission</p>
      </div>

      <div className="space-y-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-semibold text-primary mb-4">Materials ({selectedMaterials.length})</h3>
          <div className="space-y-2">
            {selectedMaterials.map(m => (
              <div key={m.id} className="flex justify-between text-sm">
                <span className="text-secondary">{m.name}</span>
                <span className="text-primary font-mono">{m.tempClass}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-semibold text-primary mb-4">Shipment Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary">Origin:</span>
              <span className="text-primary font-semibold">{shipmentDetails.origin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Destination:</span>
              <span className="text-primary font-semibold">{shipmentDetails.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Temperature Class:</span>
              <span className="text-primary font-mono font-semibold">{shipmentDetails.tempClass}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Deadline:</span>
              <span className="text-primary font-semibold">{shipmentDetails.deadline}</span>
            </div>
          </div>
        </div>

        {selectedRoute && (
          <div className="bg-accent/5 border border-accent/30 rounded-xl p-6">
            <h3 className="font-semibold text-primary mb-4">Selected Route</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary">Transport Mode:</span>
                <span className="text-primary font-semibold">{selectedRoute.mode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Transit Time:</span>
                <span className="text-primary font-semibold">{selectedRoute.transitTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Total Cost:</span>
                <span className="text-accent font-bold">${selectedRoute.cost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-primary"
        >
          New Logistics Order
        </motion.h1>
      </div>

      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition-colors ${
              step >= s ? 'border-accent bg-accent text-white' : 'border-border text-muted'
            }`}>
              {s}
            </div>
            {s < 4 && (
              <div className={`flex-1 h-1 mx-2 rounded ${
                step > s ? 'bg-accent' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl p-8">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

        <div className="flex gap-4 mt-8 pt-6 border-t border-border">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-6 py-3 bg-border hover:bg-border/80 text-primary font-semibold rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && selectedMaterials.length === 0}
              className="ml-auto flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmitOrder}
              className="ml-auto flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors"
            >
              <CheckCircle className="w-5 h-5" />
              Create Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
