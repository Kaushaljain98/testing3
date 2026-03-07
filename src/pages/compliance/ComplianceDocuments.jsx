import { motion } from 'framer-motion';
import { useState } from 'react';
import { FileText, Download, Eye, Share2, CheckCircle, Clock, XCircle, Filter, Search } from 'lucide-react';
import StatusPill from '../../components/shared/StatusPill';
import { useToast } from '../../context/ToastContext';

export default function ComplianceDocuments() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const toast = useToast();

  const documents = [
    {
      id: 'DOC-001',
      name: 'Temperature Log Report',
      shipmentId: 'PX-0234',
      type: 'Temperature Log',
      date: '2026-03-05',
      status: 'verified',
      size: '2.4 MB'
    },
    {
      id: 'DOC-002',
      name: 'Certificate of Analysis',
      shipmentId: 'PX-0234',
      type: 'Certificate',
      date: '2026-03-04',
      status: 'verified',
      size: '1.2 MB'
    },
    {
      id: 'DOC-003',
      name: 'Customs Declaration',
      shipmentId: 'PX-0235',
      type: 'Customs',
      date: '2026-03-06',
      status: 'pending',
      size: '890 KB'
    },
    {
      id: 'DOC-004',
      name: 'GDP Compliance Report',
      shipmentId: 'PX-0236',
      type: 'Compliance',
      date: '2026-03-03',
      status: 'verified',
      size: '3.1 MB'
    },
    {
      id: 'DOC-005',
      name: 'Cold Chain Integrity Certificate',
      shipmentId: 'PX-0237',
      type: 'Certificate',
      date: '2026-03-02',
      status: 'expired',
      size: '1.5 MB'
    },
    {
      id: 'DOC-006',
      name: 'Quality Assurance Log',
      shipmentId: 'PX-0238',
      type: 'Quality',
      date: '2026-03-07',
      status: 'pending',
      size: '2.8 MB'
    },
    {
      id: 'DOC-007',
      name: 'Material Safety Data Sheet',
      shipmentId: 'PX-0239',
      type: 'Safety',
      date: '2026-03-01',
      status: 'verified',
      size: '650 KB'
    },
    {
      id: 'DOC-008',
      name: 'Transport Validation Report',
      shipmentId: 'PX-0240',
      type: 'Validation',
      date: '2026-02-28',
      status: 'verified',
      size: '4.2 MB'
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.shipmentId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const getStatusConfig = (status) => {
    switch (status) {
      case 'verified':
        return { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10', border: 'border-success/30', label: 'Verified' };
      case 'pending':
        return { icon: Clock, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30', label: 'Pending' };
      case 'expired':
        return { icon: XCircle, color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/30', label: 'Expired' };
      default:
        return { icon: FileText, color: 'text-muted', bg: 'bg-muted/10', border: 'border-muted/30', label: status };
    }
  };

  const handleDownload = (doc) => {
    toast.success(`Downloading ${doc.name}`);
  };

  const handlePreview = (doc) => {
    toast.info(`Opening preview for ${doc.name}`);
  };

  const handleShare = (doc) => {
    toast.success(`Share link copied for ${doc.name}`);
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
            Compliance Documents
          </motion.h1>
          <p className="text-secondary">Manage and download compliance documentation</p>
        </div>
        <button className="px-4 py-2 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors">
          Export Audit Report
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-background border border-border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="all">All Statuses</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 bg-background border border-border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="all">All Types</option>
            <option value="Temperature Log">Temperature Log</option>
            <option value="Certificate">Certificate</option>
            <option value="Customs">Customs</option>
            <option value="Compliance">Compliance</option>
            <option value="Quality">Quality</option>
          </select>
        </div>

        <div className="text-sm text-secondary mb-4">
          Showing {filteredDocuments.length} of {documents.length} documents
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 text-xs font-semibold text-secondary uppercase">Document Name</th>
                <th className="pb-3 text-xs font-semibold text-secondary uppercase">Shipment ID</th>
                <th className="pb-3 text-xs font-semibold text-secondary uppercase">Type</th>
                <th className="pb-3 text-xs font-semibold text-secondary uppercase">Date</th>
                <th className="pb-3 text-xs font-semibold text-secondary uppercase">Status</th>
                <th className="pb-3 text-xs font-semibold text-secondary uppercase">Size</th>
                <th className="pb-3 text-xs font-semibold text-secondary uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc, i) => {
                const statusConfig = getStatusConfig(doc.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <motion.tr
                    key={doc.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-border/50"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm font-medium text-primary">{doc.name}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-mono text-secondary">{doc.shipmentId}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-secondary">{doc.type}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-secondary">{doc.date}</span>
                    </td>
                    <td className="py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${statusConfig.bg} border ${statusConfig.border} rounded-full`}>
                        <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                        <span className={`text-xs font-semibold ${statusConfig.color}`}>{statusConfig.label}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-secondary">{doc.size}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownload(doc)}
                          className="p-2 hover:bg-border rounded-lg transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4 text-secondary hover:text-primary" />
                        </button>
                        <button
                          onClick={() => handlePreview(doc)}
                          className="p-2 hover:bg-border rounded-lg transition-colors"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4 text-secondary hover:text-primary" />
                        </button>
                        <button
                          onClick={() => handleShare(doc)}
                          className="p-2 hover:bg-border rounded-lg transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-4 h-4 text-secondary hover:text-primary" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-2">No documents found</h3>
            <p className="text-secondary">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-primary">Document Summary</h3>
            <FileText className="w-5 h-5 text-accent" />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary">Total Documents</span>
              <span className="font-bold text-primary">{documents.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Verified</span>
              <span className="font-bold text-success">{documents.filter(d => d.status === 'verified').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Pending</span>
              <span className="font-bold text-warning">{documents.filter(d => d.status === 'pending').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Expired</span>
              <span className="font-bold text-danger">{documents.filter(d => d.status === 'expired').length}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 rounded-xl p-6">
          <h3 className="font-semibold text-primary mb-2">Audit Export Builder</h3>
          <p className="text-sm text-secondary mb-4">Generate a comprehensive compliance report containing temperature logs, certificates, and customs documents</p>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors">
              Build Custom Report
            </button>
            <button className="px-4 py-2 bg-border hover:bg-border/80 text-primary font-semibold rounded-lg transition-colors">
              Download All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
