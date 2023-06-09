import React, { useEffect } from 'react';
import EmailCapture from '../EmailCapture';

const FirstVisitModal = ({ modalOpen, onClose }) => {
  function escHandler({ key }) {
    if (key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', escHandler);
    return () => {
      window.removeEventListener('keydown', escHandler);
    };
  }, []);

  return (
    <div
      className={`fixed flex items-center justify-center inset-0 z-50 ${
        modalOpen ? '' : 'pointer-events-none'
      }`}
    >
      {/* backdrop */}
      <div
        className={`fixed inset-0 bg-black duration-500 ease-in-out transition-opacity  ${
          modalOpen ? 'opacity-40' : 'opacity-0'
        } `}
        onClick={onClose}
      />
      {/* content */}
      <div
        className={`fixed rounded-[50px] lg:w-2/5 w-4/5 h-auto px-5 duration-500 transition-opacity ease-in-out bg-white shadow-lg max-w-full p-0 z-50 ${
          modalOpen ? 'opacity-100' : ' opacity-0'
        }`}
      >
        <div className="flex justify-end mt-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={onClose} >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <EmailCapture inFirstVisitModal={true} />
      </div>
    </div>
  );
};

export default FirstVisitModal;