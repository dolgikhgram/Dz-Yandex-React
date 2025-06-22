import React, { useRef, useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import style from './Portal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const portalRoot = document.getElementById('portal');

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !portalRoot) {
    return null;
  }

  return createPortal(
    <div className={style.modalOverlay}>
      <button className={style.closeButton} onClick={onClose}>
        <img src={'./modalX.svg'} alt='close' />
      </button>
      <div className={style.modalContent} ref={modalRef}>
        {children}
      </div>
    </div>,
    portalRoot
  );
};

export default Modal;
