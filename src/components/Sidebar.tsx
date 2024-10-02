import React from 'react';

interface SidebarProps {
  children: React.ReactNode;  
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {


  return (
    <div className="sidebar">

      {children}  
    </div>
  );

};

export default Sidebar;
