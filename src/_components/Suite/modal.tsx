// Modal.tsx
import React from 'react';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title:string;
    className:string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children,title,className }) => {
    return (
        <>
            {isOpen && (
                <div className={`modal-overlay ${className}`} >
                    <div className="modal-content">
                        <div className='flex modal_header mt-5 '>
                        <h4>{title}</h4>
                        <button className="modal-close-btn" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        </div>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
