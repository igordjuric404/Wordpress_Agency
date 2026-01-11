import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, id, className = '', ...props }, ref) => {
    const textareaId = id || props.name;
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={textareaId}
            className="block font-display font-bold text-sm mb-2"
          >
            {label}
            {props.required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full px-4 py-3 border-3 border-neo-black bg-white font-body font-bold
            focus:outline-none
            transition-shadow duration-150 resize-y min-h-[120px] shadow-neo-sm
            ${error ? 'border-bold-pink ring-2 ring-bold-pink/20' : ''}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-1 text-sm text-neo-gray-dark">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;

