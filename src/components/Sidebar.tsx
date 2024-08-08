import React from 'react';
import { FaTruck, FaFileAlt, FaMapMarkedAlt } from 'react-icons/fa';

interface SidebarProps {
  onSelect: (component: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-item" onClick={() => onSelect('HrutaForm')}>
        <div className="icon"><FaTruck /></div>
        <span className="text">HRuta</span>
      </div>
      <div className="sidebar-item" onClick={() => onSelect('RemitoForm')}>
        <div className="icon"><FaFileAlt /></div>
        <span className="text">Remito</span>
      </div>
      <div className="sidebar-item" onClick={() => onSelect('HRepartoForm')}>
        <div className="icon"><FaMapMarkedAlt /></div>
        <span className="text">HReparto</span>
      </div>
    </div>
  );
};

export default Sidebar;
