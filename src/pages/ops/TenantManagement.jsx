import { motion } from 'framer-motion';
import { useState } from 'react';
import { Building2, Users, Package, HardDrive, UserPlus, Copy, Check, Mail, Send, CheckCircle, ClipboardList, XCircle } from 'lucide-react';
import { tenants } from '../../data/tenants';
import { shipments } from '../../data/shipments';
import { users } from '../../data/users';
import { addInvite } from '../../data/invites';
import { useToast } from '../../context/ToastContext';
import LoadingSkeleton from '../../components/shared/LoadingSkeleton';
import { registrationRequests, updateRequestStatus } from '../../data/registrationRequests';

export default function TenantManagement() {
  const [loading, setLoading] = useState(true);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: '', email: '', role: 'client_user',
    companyName: '', tenantId: ''
  });
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [activeTab, setActiveTab] = useState('tenants');
  const [processingId, setProcessingId] = useState(null);
  const toast = useToast();

  setTimeout(() => setLoading(false), 400);

  const handleCompanyInput = (value) => {
    setInviteForm(p => ({ ...p, companyName: value, tenantId: '' }));
    if (value.length > 0) {
      const filtered = tenants
        .filter(t => t.id !== 'ops' &&
          t.name.toLowerCase().includes(value.toLowerCase())
        );
      setCompanySuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCompany = (tenant) => {
    setInviteForm(p => ({
      ...p,
      companyName: tenant.name,
      tenantId: tenant.id
    }));
    setShowSuggestions(false);
  };

  const tenantsWithStats = tenants.map(tenant => ({
    ...tenant,
    activeShipments: shipments.filter(s => s.tenantId === tenant.id && s.status === 'in_transit').length,
    totalUsers: users.filter(u => u.tenantId === tenant.id).length,
    storageUsage: Math.floor(Math.random() * 80) + 20
  }));

  const pendingRequests = registrationRequests.filter(
    r => r.status === 'pending'
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
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
        <button
          onClick={() => { setShowInviteModal(true); setInviteLink(''); }}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors text-sm font-medium"
        >
          <UserPlus className="w-4 h-4" />
          Invite User
        </button>
      </div>

      <div className="flex gap-1 bg-surface border border-border rounded-xl p-1 w-fit">
        {[
          { id: 'tenants', label: '🏢 Tenants' },
          { id: 'requests', label: '📋 Registration Requests' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-accent text-white shadow-sm'
                : 'text-secondary hover:text-primary'
            }`}
          >
            {tab.label}
            {tab.id === 'requests' && pendingRequests.length > 0 && (
              <span className="bg-danger text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                {pendingRequests.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'tenants' && (
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
      )}

      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-primary">
                Registration Requests
              </h2>
              <p className="text-sm text-secondary mt-1">
                {pendingRequests.length} pending ·
                {registrationRequests.filter(r => r.status === 'approved').length} approved ·
                {registrationRequests.filter(r => r.status === 'rejected').length} rejected
              </p>
            </div>
          </div>

          {registrationRequests.length === 0 ? (
            <div className="bg-surface border border-border rounded-xl p-12 text-center">
              <ClipboardList className="w-12 h-12 text-muted mx-auto mb-4" />
              <p className="text-secondary">No registration requests yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {registrationRequests
                .sort((a, b) => {
                  const order = { pending: 0, approved: 1, rejected: 2 };
                  return order[a.status] - order[b.status];
                })
                .map(req => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-surface border rounded-xl p-5 transition-all ${
                      req.status === 'pending'
                        ? 'border-warning/40 bg-warning/3'
                        : req.status === 'approved'
                        ? 'border-success/30'
                        : 'border-border opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">

                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="text-base font-bold text-primary">
                            {req.name}
                          </span>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                            req.status === 'pending'
                              ? 'bg-warning/15 text-warning'
                              : req.status === 'approved'
                              ? 'bg-success/15 text-success'
                              : 'bg-danger/15 text-danger'
                          }`}>
                            {req.status === 'pending' ? '⏳ Pending' :
                             req.status === 'approved' ? '✅ Approved' : '❌ Rejected'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                          <div>
                            <div className="text-xs text-muted mb-0.5">Email</div>
                            <div className="text-sm text-primary font-medium truncate">
                              {req.email}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted mb-0.5">Job Title</div>
                            <div className="text-sm text-primary font-medium">
                              {req.jobTitle}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted mb-0.5">Role Requested</div>
                            <div className="text-sm text-primary font-medium capitalize">
                              {req.role.replace(/_/g, ' ')}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted mb-0.5">Organization</div>
                            <div className="text-sm text-accent font-semibold">
                              {req.tenantName}
                            </div>
                          </div>
                        </div>

                        <div className="bg-background rounded-lg px-3 py-2 mb-3">
                          <span className="text-xs text-muted">Reason: </span>
                          <span className="text-xs text-secondary italic">
                            "{req.reason}"
                          </span>
                        </div>

                        <div className="text-xs text-muted">
                          Requested by{' '}
                          <span className="text-secondary font-medium">
                            {req.requestedByName}
                          </span>
                          {' '}on{' '}
                          {new Date(req.createdAt).toLocaleDateString('en-US', {
                            month: 'long', day: 'numeric', year: 'numeric'
                          })}
                        </div>
                      </div>

                      {req.status === 'pending' && (
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          <button
                            disabled={processingId === req.id}
                            onClick={() => {
                              setProcessingId(req.id);
                              setTimeout(() => {
                                updateRequestStatus(req.id, 'approved');
                                const token = 'INVITE-' +
                                  Math.random().toString(36).substring(2,10).toUpperCase();
                                addInvite({
                                  token,
                                  email: req.email,
                                  name: req.name,
                                  role: req.role,
                                  tenantId: req.tenantId,
                                  tenantName: req.tenantName,
                                  invitedBy: 'ops@polaraxis.com',
                                  createdAt: new Date().toISOString(),
                                  expiresAt: new Date(
                                    Date.now() + 30*24*60*60*1000
                                  ).toISOString(),
                                  status: 'pending'
                                });
                                toast.success(
                                  'Approved! Invite created for ' + req.email
                                );
                                setProcessingId(null);
                              }, 600);
                            }}
                            className="flex items-center gap-1.5 px-4 py-2 bg-success/10 hover:bg-success/20 text-success border border-success/30 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            Approve & Invite
                          </button>
                          <button
                            disabled={processingId === req.id}
                            onClick={() => {
                              setProcessingId(req.id);
                              setTimeout(() => {
                                updateRequestStatus(req.id, 'rejected');
                                toast.error('Request rejected');
                                setProcessingId(null);
                              }, 400);
                            }}
                            className="flex items-center gap-1.5 px-4 py-2 bg-danger/10 hover:bg-danger/20 text-danger border border-danger/30 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              }
            </div>
          )}
        </div>
      )}

      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            <h3 className="text-lg font-semibold text-primary mb-1">Invite New User</h3>
            <p className="text-sm text-secondary mb-6">
              Generate an invite link. The user will set their own password.
            </p>

            {!inviteLink ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={inviteForm.name}
                    onChange={e => setInviteForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Dr. Jane Smith"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Work Email</label>
                  <input
                    type="email"
                    value={inviteForm.email}
                    onChange={e => setInviteForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Role</label>
                  <select
                    value={inviteForm.role}
                    onChange={e => setInviteForm(p => ({ ...p, role: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value="client_user">Client User</option>
                    <option value="client_admin">Client Admin</option>
                    <option value="compliance_auditor">Compliance Auditor</option>
                    <option value="logistics_coordinator">Logistics Coordinator</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-secondary mb-1.5">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={inviteForm.companyName}
                    onChange={e => handleCompanyInput(e.target.value)}
                    onFocus={() => inviteForm.companyName && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    placeholder="Type company name..."
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                  {showSuggestions && (
                    <div className="absolute z-50 w-full mt-1 bg-surface border border-border rounded-lg shadow-lg overflow-hidden">
                      {companySuggestions.length > 0 ? (
                        companySuggestions.map(t => (
                          <button
                            key={t.id}
                            type="button"
                            onMouseDown={() => selectCompany(t)}
                            className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-accent/5 text-left transition-colors"
                          >
                            <div>
                              <div className="text-sm font-medium text-primary">{t.name}</div>
                              <div className="text-xs text-muted">{t.industry}</div>
                            </div>
                            <span className="text-xs text-accent font-medium">{t.plan}</span>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3">
                          <div className="text-sm text-primary font-medium">
                            + Create "{inviteForm.companyName}"
                          </div>
                          <div className="text-xs text-muted mt-0.5">
                            New organization will be created
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {inviteForm.tenantId && (
                    <p className="text-xs text-success mt-1">
                      ✓ Existing organization selected
                    </p>
                  )}
                  {inviteForm.companyName && !inviteForm.tenantId && (
                    <p className="text-xs text-accent mt-1">
                      ✦ New organization will be created on invite acceptance
                    </p>
                  )}
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 py-2.5 border border-border text-secondary hover:text-primary rounded-lg text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!inviteForm.name || !inviteForm.email || !inviteForm.companyName) {
                        toast.error('Please fill in all fields');
                        return;
                      }
                      const tenant = inviteForm.tenantId
                        ? tenants.find(t => t.id === inviteForm.tenantId)
                        : { name: inviteForm.companyName };
                      const resolvedTenantId = inviteForm.tenantId ||
                        ('tenant-' + Date.now());
                      const token = 'INVITE-' + Math.random().toString(36).substring(2, 10).toUpperCase();
                      const newInvite = {
                        token,
                        email: inviteForm.email,
                        name: inviteForm.name,
                        role: inviteForm.role,
                        tenantId: resolvedTenantId,
                        tenantName: tenant?.name || inviteForm.companyName,
                        invitedBy: 'ops@polaraxis.com',
                        createdAt: new Date().toISOString(),
                        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                        status: 'pending'
                      };
                      addInvite(newInvite);
                      const link = window.location.origin + '/register?token=' + token;
                      setInviteLink(link);
                      toast.success('Invite created successfully');
                    }}
                    className="flex-1 py-2.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg text-sm transition-colors"
                  >
                    Generate Invite Link
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-success/8 border border-success/25 rounded-xl p-4 text-center">
                  <Check className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="text-sm font-semibold text-primary">Invite link generated!</p>
                  <p className="text-xs text-secondary mt-1">
                    Send this link to <span className="font-medium">{inviteForm.email}</span>.
                    Expires in 30 days.
                  </p>
                </div>
                <div className="bg-background border border-border rounded-lg p-3">
                  <p className="text-xs text-muted mb-2 font-mono break-all">{inviteLink}</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(inviteLink);
                      toast.success('Link copied to clipboard');
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg text-sm font-medium transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </button>
                </div>
                {!emailSent ? (
                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="bg-background px-4 py-2 border-b border-border flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-muted" />
                      <span className="text-xs text-muted font-medium">Email Preview</span>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex gap-2 text-xs">
                        <span className="text-muted w-6">To:</span>
                        <span className="text-primary font-medium">{inviteForm.email}</span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <span className="text-muted w-6">Re:</span>
                        <span className="text-secondary">
                          You've been invited to join PolarAxis
                        </span>
                      </div>
                      <div className="pt-2 border-t border-border text-xs text-secondary leading-relaxed">
                        Hi {inviteForm.name}, you have been invited to join{' '}
                        <span className="font-medium text-primary">
                          {inviteForm.companyName}
                        </span>{' '}
                        on PolarAxis as{' '}
                        <span className="font-medium text-primary capitalize">
                          {inviteForm.role.replace(/_/g, ' ')}
                        </span>
                        . Click the link below to activate your account.
                        This invite expires in 30 days.
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <button
                        onClick={() => {
                          setTimeout(() => setEmailSent(true), 800);
                          toast.success('Invitation email sent to ' + inviteForm.email);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        Send Invitation Email
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-success/8 border border-success/25 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-primary">Email sent!</p>
                      <p className="text-xs text-secondary mt-0.5">
                        Invitation delivered to {inviteForm.email}
                      </p>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => {
                    setShowInviteModal(false);
                    setInviteForm({ name: '', email: '', role: 'client_user', companyName: '', tenantId: '' });
                    setInviteLink('');
                    setEmailSent(false);
                  }}
                  className="w-full py-2.5 border border-border text-secondary hover:text-primary rounded-lg text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
