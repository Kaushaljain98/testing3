import { motion } from 'framer-motion';
import { useState } from 'react';
import { Package, Thermometer, Clock, DollarSign, ShieldCheck, Search, Filter, X } from 'lucide-react';
import { materials } from '../../data/materials';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/shared/Modal';

export default function ProcurementMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [tempClassFilter, setTempClassFilter] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestForm, setRequestForm] = useState({
    quantity: '',
    destination: '',
    urgency: 'standard',
    deliveryDate: ''
  });
  const toast = useToast();

  const categories = ['all', ...new Set(materials.map(m => m.category))];
  const tempClasses = ['all', '2-8°C', '-20°C', '-70°C'];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || material.category === categoryFilter;
    const matchesTempClass = tempClassFilter === 'all' || material.tempClass === tempClassFilter;
    return matchesSearch && matchesCategory && matchesTempClass;
  });

  const handleRequestMaterial = (material) => {
    setSelectedMaterial(material);
    setShowRequestModal(true);
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    toast.success(`Request submitted for ${selectedMaterial.name}`);
    setShowRequestModal(false);
    setRequestForm({ quantity: '', destination: '', urgency: 'standard', deliveryDate: '' });
    setSelectedMaterial(null);
  };

  const getTempColor = (tempClass) => {
    switch (tempClass) {
      case '2-8°C': return 'from-blue-500 to-cyan-500';
      case '-20°C': return 'from-purple-500 to-blue-500';
      case '-70°C': return 'from-indigo-600 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
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
            Procurement Marketplace
          </motion.h1>
          <p className="text-secondary">Browse and request certified pharmaceutical materials</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search materials..."
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 bg-background border border-border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
          <select
            value={tempClassFilter}
            onChange={(e) => setTempClassFilter(e.target.value)}
            className="px-4 py-3 bg-background border border-border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            {tempClasses.map(temp => (
              <option key={temp} value={temp}>
                {temp === 'all' ? 'All Temperatures' : temp}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-secondary mb-4">
          Showing {filteredMaterials.length} of {materials.length} materials
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material, i) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className={`h-2 bg-gradient-to-r ${getTempColor(material.tempClass)}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary mb-1">{material.name}</h3>
                    <p className="text-xs text-secondary">{material.category}</p>
                  </div>
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-accent" />
                  </div>
                </div>

                <p className="text-sm text-secondary mb-4 line-clamp-2">{material.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted flex items-center gap-2">
                      <Thermometer className="w-4 h-4" />
                      Temperature
                    </span>
                    <span className="font-mono font-semibold text-primary">{material.tempClass}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Available
                    </span>
                    <span className="font-semibold text-primary">{material.quantity} {material.unit}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Lead Time
                    </span>
                    <span className="font-semibold text-primary">{material.leadTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Price
                    </span>
                    <span className="font-mono font-bold text-accent">${material.pricePerUnit}/{material.unit}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {material.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs text-emerald-700 dark:text-emerald-300"
                    >
                      <ShieldCheck className="w-3 h-3" />
                      {cert}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleRequestMaterial(material)}
                  className="w-full py-2.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
                >
                  Request Material
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-2">No materials found</h3>
            <p className="text-secondary">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {showRequestModal && (
        <Modal
          isOpen={showRequestModal}
          onClose={() => {
            setShowRequestModal(false);
            setSelectedMaterial(null);
          }}
          title={`Request ${selectedMaterial?.name}`}
        >
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Quantity ({selectedMaterial?.unit})
              </label>
              <input
                type="number"
                value={requestForm.quantity}
                onChange={(e) => setRequestForm({ ...requestForm, quantity: e.target.value })}
                required
                min="1"
                placeholder={`Available: ${selectedMaterial?.quantity}`}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Destination
              </label>
              <input
                type="text"
                value={requestForm.destination}
                onChange={(e) => setRequestForm({ ...requestForm, destination: e.target.value })}
                required
                placeholder="City, Country or Facility Code"
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Urgency Level
              </label>
              <select
                value={requestForm.urgency}
                onChange={(e) => setRequestForm({ ...requestForm, urgency: e.target.value })}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value="standard">Standard</option>
                <option value="priority">Priority (+15% fee)</option>
                <option value="emergency">Emergency (+35% fee)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Required Delivery Date
              </label>
              <input
                type="date"
                value={requestForm.deliveryDate}
                onChange={(e) => setRequestForm({ ...requestForm, deliveryDate: e.target.value })}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
              <div className="text-sm text-secondary space-y-1">
                <div className="flex justify-between">
                  <span>Material:</span>
                  <span className="font-semibold text-primary">{selectedMaterial?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Temperature Class:</span>
                  <span className="font-mono font-semibold text-primary">{selectedMaterial?.tempClass}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lead Time:</span>
                  <span className="font-semibold text-primary">{selectedMaterial?.leadTime}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowRequestModal(false);
                  setSelectedMaterial(null);
                }}
                className="flex-1 py-3 bg-border hover:bg-border/80 text-primary font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
              >
                Submit Request
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
