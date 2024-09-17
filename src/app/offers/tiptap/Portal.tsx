import * as React from "react";
import * as ReactDOM from "react-dom";

const domNode = document.getElementById("portalRoot") as HTMLDivElement;

export const Portal: React.FC = ({ children }) => {
  return ReactDOM.createPortal(children, domNode);
};
