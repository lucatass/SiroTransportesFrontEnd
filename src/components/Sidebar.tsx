import React from 'react';
import { FaTruck, FaFileAlt, FaMapMarkedAlt } from 'react-icons/fa';
import SidebarButton from './SidebarButton';

interface SidebarProps {
  onSelect: (component: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <SidebarButton
        icon={<FaTruck />}
        label="HRuta"
        onClick={() => onSelect('HrutaForm')}
      />
      <SidebarButton
        icon={<FaFileAlt />}
        label="Remito"
        onClick={() => onSelect('RemitoForm')}
      />
      <SidebarButton
        icon={<FaMapMarkedAlt />}
        label="HReparto"
        onClick={() => onSelect('HRepartoForm')}
      />
    </div>
  );
};

export default Sidebar;
