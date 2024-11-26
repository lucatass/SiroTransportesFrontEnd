// FormRow.tsx
import React from "react";

interface FormRowProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const FormRow: React.FC<FormRowProps> = ({ children, className,style, ...props }) => {
  return <div className={`form-row ${className || ""}`}>{children}</div>;
};

export default FormRow;
