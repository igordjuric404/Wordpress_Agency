import { forwardRef, type SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, id, className = '', ...props }, ref) => {
    const selectId = id || props.name;
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={selectId}
            className="block font-display font-bold text-sm mb-2"
          >
            {label}
            {props.required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`
            w-full px-4 py-3 border-3 border-neo-black bg-white font-body font-bold
            focus:outline-none
            transition-shadow duration-150 cursor-pointer shadow-neo-sm
            ${error ? 'border-bold-pink ring-2 ring-bold-pink/20' : ''}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${selectId}-error`} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="mt-1 text-sm text-neo-gray-dark">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;

