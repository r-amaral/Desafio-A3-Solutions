import React, { RefObject } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import "./popover.css";

interface PopoverProps {
  open: boolean;
  setOpen(e: boolean): void;
  children: React.ReactNode;
}

const Popover = ({ open, setOpen, children }: PopoverProps) => {
  const wrapperRef = React.createRef<HTMLDivElement>();

  useClickOutside(wrapperRef as RefObject<HTMLElement>, () =>
    setOpen(false)
  );

  if (!open) return null;
  return (
    <div ref={wrapperRef} className="Popover__Overlay">
      {children}
    </div>
  );
};

export default Popover;
