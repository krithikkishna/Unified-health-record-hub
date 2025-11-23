// src/components/RoleSelector.jsx
import React from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../redux/slices/authSlice';
import { User, ShieldCheck, Stethoscope } from 'lucide-react';

const roles = [
  { value: 'patient', label: 'Patient', icon: <User /> },
  { value: 'provider', label: 'Provider', icon: <Stethoscope /> },
  { value: 'admin', label: 'Admin', icon: <ShieldCheck /> },
];

const RoleSelector = () => {
  const dispatch = useDispatch();
  const selectedRole = useSelector((state) => state.auth.role);

  const handleSelect = (role) => {
    dispatch(setRole(role));
  };

  return (
    <div className={styles.roleSelector}>
      <h3 className={styles.title}>Select Your Role</h3>
      <div className={styles.roles}>
        {roles.map(({ value, label, icon }) => (
          <button
            key={value}
            role="button"
            tabIndex={0}
            aria-pressed={selectedRole === value}
            onClick={() => handleSelect(value)}
            className={`${styles.roleButton} ${selectedRole === value ? styles.active : ''}`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
