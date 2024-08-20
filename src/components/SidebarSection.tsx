import React, { useState } from 'react';

interface SidebarSectionProps {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ label, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`sidebar-section ${isOpen ? 'open' : ''}`}>
      <div className="section-label" onClick={() => setIsOpen(!isOpen)}>
        {label}
        {icon && <span className="section-icon">{icon}</span>}
      </div>
      <div className="section-content">{children}</div>
    </div>
  );
};

export default SidebarSection;
