import React, { CSSProperties } from "react";
import "./Button.css";

type ButtonTypes = {
  type?: "contained" | "outlined" | "textual";
  children: any;
  style?: CSSProperties;
  className?: string;
  onClick?: any;
};

const ButtonUI = (props: ButtonTypes) => {
  let { type, children, style, className, onClick} = props;

  type = type || "contained";

  return (
    <div style={style} 
    className={`custom-btn custom-btn-${type} ${className}`}
    onClick={onClick}>
      {children}
    </div>
  );
};

export default ButtonUI;
