import React from 'react';

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, label, onClick }) => {
  return (
    <div className="sidebar-item" onClick={onClick}>
      <div className="icon">{icon}</div>
      <span className="text">{label}</span>
    </div>
  );
};

export default SidebarButton;
