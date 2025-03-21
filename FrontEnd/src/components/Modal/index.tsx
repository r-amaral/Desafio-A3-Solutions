import React from "react";
import XMark from "../../assets/x-mark.webp";
import "./modal.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;

  return (
    <div className="Modal__Overlay">
      <div className="Modal__Container">
        <button onClick={onClose} className="Modal__Close__Button">
          <img src={XMark} alt="icon close modal" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
