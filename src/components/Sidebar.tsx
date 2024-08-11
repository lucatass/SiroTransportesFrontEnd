import React from 'react';

interface SidebarProps {
  onSelect: (component: string) => void;
  children: React.ReactNode;  // Allow children to be passed in
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect, children }) => {
  return (
    <div className="sidebar">
      {children}  {/* Render the children here */}
    </div>
  );
};

export default Sidebar;
