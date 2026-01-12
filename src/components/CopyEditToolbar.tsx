import { Edit, Copy, X } from 'lucide-react';
import { useCopyEdit } from '../contexts/CopyEditContext';

export default function CopyEditToolbar() {
  const { isEditMode, toggleEditMode, copyPageContent } = useCopyEdit();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex gap-2">
      <button
        onClick={toggleEditMode}
        className={`p-3 rounded-lg border-3 border-neo-black shadow-neo-sm transition-all ${
          isEditMode
            ? 'bg-bold-pink text-white hover:bg-bold-pink/90'
            : 'bg-white text-neo-black hover:bg-bold-blue hover:text-white'
        }`}
        aria-label={isEditMode ? 'Exit edit mode' : 'Enter edit mode'}
        title={isEditMode ? 'Exit edit mode' : 'Enter edit mode'}
      >
        {isEditMode ? <X className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
      </button>
      
      {isEditMode && (
        <button
          onClick={copyPageContent}
          className="p-3 rounded-lg border-3 border-neo-black shadow-neo-sm bg-bold-green text-white hover:bg-bold-green/90 transition-all"
          aria-label="Copy page content"
          title="Copy all page content"
        >
          <Copy className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

