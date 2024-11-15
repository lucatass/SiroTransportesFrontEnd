import React from 'react';

export interface SidebarButtonProps {
  label: string;
  icon: React.ReactNode;
  componentKey: string;
}

export interface SidebarSectionData {
  label: string;
  key: string;
  icon: React.ReactNode;
  buttons: SidebarButtonProps[];
}

export interface SidebarSectionProps {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}
