import React, { useState } from 'react';
import { SidebarSectionProps } from './SidebarTypes';

const SidebarSection: React.FC<SidebarSectionProps> = ({ label, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className={`sidebar-section ${isOpen ? 'open' : ''}`}>
      <div className="section-label" onClick={handleClick}>
        {icon && <span className="section-icon">{icon}</span>}
        {label}
      </div>
      {isOpen && <div className="section-content">{children}</div>}
    </div>
  );
};

export default SidebarSection;

