import React, { useState } from 'react';

interface SidebarSectionProps {
  label: string;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`sidebar-section ${isOpen ? 'open' : ''}`}>
      <div className="section-label" onClick={() => setIsOpen(!isOpen)}>
        {label}
      </div>
      <div className="section-content">{children}</div>
    </div>
  );
};

export default SidebarSection;
