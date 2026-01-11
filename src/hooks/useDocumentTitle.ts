import { useEffect } from 'react';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} | NeoPress` : 'NeoPress - Expert WordPress Development Agency';
    
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}

