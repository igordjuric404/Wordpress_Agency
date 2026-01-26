import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import { useCopyEdit } from '../contexts/CopyEditContext';

interface EditableTextProps {
  children: ReactNode;
  copyKey: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  [key: string]: unknown;
}

export default function EditableText({
  children,
  copyKey,
  as: Component = 'span',
  className = '',
  ...props
}: EditableTextProps) {
  const { isEditMode, editedContent, updateContent } = useCopyEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState('');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  
  // Get original text from children
  const getOriginalText = (): string => {
    if (typeof children === 'string') return children;
    if (typeof children === 'number') return String(children);
    // For React elements, try to extract text
    if (React.isValidElement(children)) {
      return extractTextFromElement(children);
    }
    if (Array.isArray(children)) {
      return children
        .map((child: unknown) => {
          if (typeof child === 'string') return child;
          if (typeof child === 'number') return String(child);
          if (React.isValidElement(child)) return extractTextFromElement(child);
          return '';
        })
        .join('');
    }
    return '';
  };
  
  const extractTextFromElement = (element: React.ReactElement): string => {
    const props = element.props as { children?: ReactNode };
    if (typeof props.children === 'string') {
      return props.children;
    }
    if (typeof props.children === 'number') {
      return String(props.children);
    }
    if (Array.isArray(props.children)) {
      return props.children
        .map((child: unknown) => {
          if (typeof child === 'string') return child;
          if (typeof child === 'number') return String(child);
          if (React.isValidElement(child)) {
            // Handle <br /> tags as newlines
            if (child.type === 'br') return '\n';
            return extractTextFromElement(child);
          }
          return '';
        })
        .join('');
    }
    return '';
  };
  
  const originalText = getOriginalText();
  const isMultiline = originalText.length > 50 || originalText.includes('\n');
  const displayValue = editedContent[copyKey] || originalText;
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (isEditMode && !isEditing) {
      setIsEditing(true);
      setLocalValue(displayValue);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (localValue !== displayValue) {
      updateContent(copyKey, localValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isMultiline) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setLocalValue(displayValue);
      setIsEditing(false);
    }
  };

  if (!isEditMode) {
    return <Component className={className} {...props}>{children}</Component>;
  }

  if (isEditing) {
    const InputComponent = isMultiline ? 'textarea' : 'input';
    return (
      <Component
        className={`${className} relative`}
        data-copy-key={copyKey}
        {...props}
      >
        <InputComponent
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={inputRef as any}
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full bg-bold-yellow/20 border-2 border-bold-pink px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-bold-pink"
          style={{
            font: 'inherit',
            color: 'inherit',
            minWidth: '200px',
            ...(isMultiline && { minHeight: '80px', resize: 'vertical' }),
          }}
        />
      </Component>
    );
  }

  // Render display value with line breaks preserved
  const renderDisplayValue = () => {
    if (displayValue.includes('\n')) {
      return displayValue.split('\n').map((line, i, arr) => (
        <React.Fragment key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return displayValue;
  };

  return (
    <Component
      className={`${className} ${isEditMode ? 'cursor-pointer hover:bg-bold-yellow/20 hover:outline-2 hover:outline-dashed hover:outline-bold-pink rounded px-1 transition-all' : ''}`}
      onClick={handleClick}
      data-copy-key={copyKey}
      {...props}
    >
      {renderDisplayValue()}
    </Component>
  );
}

