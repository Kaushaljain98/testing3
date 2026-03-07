import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { shipments } from '../data/shipments';

export function useShipments() {
  const { currentUser } = useAuth();

  const filteredShipments = useMemo(() => {
    if (!currentUser) {
      return [];
    }

    const role = currentUser.role;

    if (role === 'operations_admin' || role === 'logistics_coordinator' || role === 'compliance_auditor') {
      return shipments;
    }

    if (role === 'client_admin' || role === 'client_user') {
      return shipments.filter(shipment => shipment.tenantId === currentUser.tenantId);
    }

    return [];
  }, [currentUser]);

  return {
    shipments: filteredShipments,
    allShipments: shipments,
    canEditShipments: currentUser?.role === 'operations_admin' || currentUser?.role === 'logistics_coordinator',
    canViewCompliance: currentUser?.role === 'compliance_auditor' || currentUser?.role === 'operations_admin',
    isReadOnly: currentUser?.role === 'compliance_auditor'
  };
}
