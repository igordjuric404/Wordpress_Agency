import { createContext, useContext, useState, ReactNode } from 'react';

interface CopyEditContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  copyPageContent: () => void;
  editedContent: Record<string, string>;
  updateContent: (key: string, value: string) => void;
}

const CopyEditContext = createContext<CopyEditContextType | undefined>(undefined);

export function CopyEditProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  const updateContent = (key: string, value: string) => {
    setEditedContent(prev => ({ ...prev, [key]: value }));
  };

  const copyPageContent = () => {
    // Collect all text content from the page
    const textElements: { key: string; text: string; element: string }[] = [];
    
    // Find all editable text elements
    document.querySelectorAll('[data-copy-key]').forEach((el) => {
      const key = el.getAttribute('data-copy-key');
      const elementType = el.tagName.toLowerCase();
      // Get text content, preferring edited content if available
      const text = editedContent[key || ''] || el.textContent?.trim() || '';
      
      if (key && text) {
        textElements.push({ key, text, element: elementType });
      }
    });

    // Sort by key for better organization
    textElements.sort((a, b) => a.key.localeCompare(b.key));

    // Format as structured text with better organization
    const formatted = textElements
      .map(({ key, text, element }) => {
        // Clean up text (remove extra whitespace, preserve line breaks)
        const cleanText = text.replace(/\s+/g, ' ').trim();
        return `${key}: ${cleanText}`;
      })
      .join('\n');

    // Add header with page info
    const pageTitle = document.title || 'Page';
    const pageUrl = window.location.pathname;
    const fullOutput = `Page: ${pageTitle}\nURL: ${pageUrl}\n\n${formatted}`;

    // Copy to clipboard
    navigator.clipboard.writeText(fullOutput).then(() => {
      alert('Page copy copied to clipboard!');
    }).catch(() => {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = fullOutput;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Page copy copied to clipboard!');
    });
  };

  return (
    <CopyEditContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        copyPageContent,
        editedContent,
        updateContent,
      }}
    >
      {children}
    </CopyEditContext.Provider>
  );
}

export function useCopyEdit() {
  const context = useContext(CopyEditContext);
  if (context === undefined) {
    throw new Error('useCopyEdit must be used within a CopyEditProvider');
  }
  return context;
}

