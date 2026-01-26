import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label?: string;
  error?: string;
  helperText?: string;
  options: DropdownOption[];
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  required?: boolean;
  className?: string;
}

export default function Dropdown({
  label,
  error,
  helperText,
  options,
  placeholder = 'Select an option...',
  value,
  onChange,
  name,
  required,
  className = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    // Create a synthetic event that matches HTMLSelectElement's ChangeEvent
    const syntheticEvent = {
      target: { 
        value: optionValue, 
        name: name || '' 
      }
    } as React.ChangeEvent<HTMLSelectElement>;
    
    onChange(syntheticEvent);
    setIsOpen(false);
  };

  return (
    <div className={`w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block font-display font-bold text-sm mb-2">
          {label}
          {required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full px-3 py-2 md:px-4 md:py-3 border-3 border-neo-black bg-white font-body font-bold text-sm md:text-base
            focus:outline-none
            transition-shadow duration-150 shadow-neo-sm
            flex items-center justify-between text-left
            ${error ? 'border-bold-pink ring-2 ring-bold-pink/20' : ''}
            ${!selectedOption ? 'text-neo-gray-dark' : 'text-neo-black'}
          `}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{displayText}</span>
          <ChevronDown 
            className={`w-5 h-5 text-neo-black transition-transform ${isOpen ? 'rotate-180' : ''}`}
            strokeWidth={3}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div 
            className="absolute top-full left-0 right-0 bg-white border-3 border-neo-black border-t-0 shadow-neo-lg z-50"
            role="listbox"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const colors = ['hover:bg-soft-pink', 'hover:bg-soft-yellow', 'hover:bg-soft-green', 'hover:bg-soft-blue', 'hover:bg-soft-purple'];
              const hoverColor = colors[index % colors.length];

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`
                    w-full px-3 py-2 md:px-4 md:py-3 text-left font-body font-bold text-sm md:text-base border-b-3 border-neo-black last:border-b-0
                    transition-colors flex items-center justify-between
                    ${isSelected ? 'bg-bold-pink text-white' : `text-neo-black ${hoverColor}`}
                  `}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="w-5 h-5" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-neo-gray-dark">
          {helperText}
        </p>
      )}
    </div>
  );
}

