import React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

interface CustomButtonProps extends ButtonProps {
  backgroundColor?: string;
  hoverColor?: string;
  textColor?: string;
  margin?: string;
  fontSize?: string;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) =>
    !["backgroundColor", "hoverColor", "textColor", "margin", "fontSize"].includes(prop as string),
})<CustomButtonProps>(
  ({
    backgroundColor = "#0063cc",
    hoverColor = "#005bb5",
    textColor = "white",
    margin = "0",
    fontSize = "1rem",
  }) => ({
    backgroundColor,
    color: textColor,
    margin,
    fontSize,
    fontWeight: "bold",
    textTransform: "none",
    padding: "10px 20px",
    "&:hover": {
      backgroundColor: hoverColor,
    },
    "&:active": {
      transform: "scale(0.98)",
    },
    "&:disabled": {
      backgroundColor: "#ccc",
      color: "#666",
    },
  })
);

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...restProps }) => {
  return <StyledButton {...restProps}>{children}</StyledButton>;
};

export default CustomButton;
