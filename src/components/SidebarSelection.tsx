// SidebarSection.tsx
import React from 'react';

interface SidebarSectionProps {
  label: string;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ label, children }) => {
  return (
    <div className="sidebar-section">
      <div className="section-label">{label}</div>
      <div className="section-content">
        {children}
      </div>
    </div>
  );
};

export default SidebarSection;
