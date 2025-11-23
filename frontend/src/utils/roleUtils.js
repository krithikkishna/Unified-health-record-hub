// utils/roleUtils.js

// Define all available roles in the system
export const ROLES = {
    ADMIN: 'admin',
    DOCTOR: 'doctor',
    NURSE: 'nurse',
    PATIENT: 'patient',
    LAB_TECH: 'lab_tech',
    PHARMACIST: 'pharmacist',
  };
  
  // Define access levels for each role
  export const roleAccess = {
    [ROLES.ADMIN]: {
      canAccessDashboard: true,
      canManageUsers: true,
      canViewPatients: true,
      canViewVitals: true,
      canAccessSystemHealth: true,
      canViewPrescriptions: true,
    },
    [ROLES.DOCTOR]: {
      canAccessDashboard: true,
      canManageUsers: false,
      canViewPatients: true,
      canViewVitals: true,
      canAccessSystemHealth: false,
      canViewPrescriptions: true,
    },
    [ROLES.NURSE]: {
      canAccessDashboard: true,
      canManageUsers: false,
      canViewPatients: true,
      canViewVitals: true,
      canAccessSystemHealth: false,
      canViewPrescriptions: false,
    },
    [ROLES.PATIENT]: {
      canAccessDashboard: true,
      canManageUsers: false,
      canViewPatients: false,
      canViewVitals: true,
      canAccessSystemHealth: false,
      canViewPrescriptions: true,
    },
    [ROLES.LAB_TECH]: {
      canAccessDashboard: true,
      canManageUsers: false,
      canViewPatients: true,
      canViewVitals: false,
      canAccessSystemHealth: false,
      canViewPrescriptions: false,
    },
    [ROLES.PHARMACIST]: {
      canAccessDashboard: true,
      canManageUsers: false,
      canViewPatients: true,
      canViewVitals: false,
      canAccessSystemHealth: false,
      canViewPrescriptions: true,
    },
  };
  
  // Check if a role has a specific permission
  export const hasPermission = (role, permission) => {
    return roleAccess[role]?.[permission] ?? false;
  };
  
  // Return default dashboard path per role
  export const getDashboardPathByRole = (role) => {
    switch (role) {
      case ROLES.ADMIN:
        return '/dashboard/admin';
      case ROLES.DOCTOR:
        return '/dashboard/doctor';
      case ROLES.NURSE:
        return '/dashboard/nurse';
      case ROLES.PATIENT:
        return '/dashboard/patient';
      case ROLES.LAB_TECH:
        return '/dashboard/lab';
      case ROLES.PHARMACIST:
        return '/dashboard/pharmacy';
      default:
        return '/unauthorized';
    }
  };
  