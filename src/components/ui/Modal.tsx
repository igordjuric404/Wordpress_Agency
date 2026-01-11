import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import Hoverable from './hoverable';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement;
      
      // Focus the modal
      modalRef.current?.focus();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
        
        // Return focus to the previous element
        if (previousActiveElement.current instanceof HTMLElement) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-neo-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-3xl max-h-[90vh] bg-white border-4 border-neo-black shadow-neo-lg overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-neo-black bg-soft-yellow">
          <h2 id="modal-title" className="font-display font-black text-2xl uppercase tracking-tighter">
            {title}
          </h2>
          <Hoverable as="button">
          <button
            onClick={onClose}
              className="p-3 border-3 border-neo-black bg-bold-pink text-white"
            aria-label="Close modal"
          >
            <X size={24} strokeWidth={3} />
          </button>
          </Hoverable>
        </div>
        
        {/* Body */}
        <div className="p-8 overflow-y-auto bg-soft-blue">
          <div className="bg-white border-4 border-neo-black p-6 md:p-8 shadow-neo-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

