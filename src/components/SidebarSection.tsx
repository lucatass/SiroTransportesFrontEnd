import React, { useState } from 'react';

interface SidebarSectionProps {
  label: string;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar-section ${isOpen ? 'open' : ''}`}>
      <div className="section-label" onClick={toggleDropdown}>
        {label}
      </div>
      <div className={`section-content ${isOpen ? 'show' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default SidebarSection;
