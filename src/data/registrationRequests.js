export let registrationRequests = [
  {
    id: 'req-001',
    requestedBy: 'priya@novabio.com',
    requestedByName: 'Dr. Priya Sharma',
    tenantId: 'tenant-1',
    tenantName: 'NovaBio Pharma',
    name: 'Arjun Mehta',
    email: 'amehta@novabio.com',
    jobTitle: 'Supply Chain Analyst',
    role: 'client_user',
    reason: 'New hire joining the logistics coordination team',
    createdAt: '2026-03-06T09:00:00Z',
    status: 'pending'
  },
  {
    id: 'req-002',
    requestedBy: 'sarah@cryomed.com',
    requestedByName: 'Sarah Johnson',
    tenantId: 'tenant-2',
    tenantName: 'CryoMed Solutions',
    name: 'Tom Bergmann',
    email: 'tbergmann@cryomed.com',
    jobTitle: 'Regulatory Affairs Manager',
    role: 'client_admin',
    reason: 'Replacing outgoing compliance lead, needs admin access',
    createdAt: '2026-03-07T11:30:00Z',
    status: 'pending'
  }
];

export const addRequest = (request) => {
  registrationRequests.push(request);
};

export const updateRequestStatus = (id, status) => {
  const idx = registrationRequests.findIndex(r => r.id === id);
  if (idx !== -1) {
    registrationRequests[idx] = {
      ...registrationRequests[idx],
      status
    };
    return registrationRequests[idx];
  }
  return null;
};


export { registrationRequests }