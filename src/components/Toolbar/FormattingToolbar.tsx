import { useState, useEffect, useRef } from 'react';
import { editorCommands } from '../../utils/editorCommands';

interface FormattingToolbarProps {
  editorRef: React.RefObject<HTMLDivElement>;
}

const FormattingToolbar = ({ editorRef }: FormattingToolbarProps) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  // Update button states based on current selection
  const updateButtonStates = () => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;

    // Check if we're inside the editor
    if (!editorRef.current.contains(container)) return;

    // Check formatting states
    setIsBold(document.queryCommandState('bold'));
    setIsItalic(document.queryCommandState('italic'));
    setIsUnderline(document.queryCommandState('underline'));
  };

  // Listen for selection changes
  useEffect(() => {
    const handleSelectionChange = () => {
      updateButtonStates();
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const handleFormat = (command: () => void) => {
    command();
    // Update states after a brief delay to allow the command to execute
    setTimeout(updateButtonStates, 10);
  };

  return (
    <div className="flex items-center gap-1 p-2 bg-slate-100 rounded-lg border border-slate-200">
      <button
        onClick={() => handleFormat(editorCommands.bold)}
        className={`p-2 rounded transition-colors duration-200 ${
          isBold
            ? 'bg-slate-300 text-slate-800'
            : 'bg-white text-slate-600 hover:bg-slate-200'
        }`}
        type="button"
        aria-label="Bold"
        title="Bold (Ctrl+B)"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
          <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
        </svg>
      </button>

      <button
        onClick={() => handleFormat(editorCommands.italic)}
        className={`p-2 rounded transition-colors duration-200 ${
          isItalic
            ? 'bg-slate-300 text-slate-800'
            : 'bg-white text-slate-600 hover:bg-slate-200'
        }`}
        type="button"
        aria-label="Italic"
        title="Italic (Ctrl+I)"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="4" x2="10" y2="4" />
          <line x1="14" y1="20" x2="5" y2="20" />
          <line x1="15" y1="4" x2="9" y2="20" />
        </svg>
      </button>

      <button
        onClick={() => handleFormat(editorCommands.underline)}
        className={`p-2 rounded transition-colors duration-200 ${
          isUnderline
            ? 'bg-slate-300 text-slate-800'
            : 'bg-white text-slate-600 hover:bg-slate-200'
        }`}
        type="button"
        aria-label="Underline"
        title="Underline (Ctrl+U)"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
          <line x1="4" y1="21" x2="20" y2="21" />
        </svg>
      </button>
    </div>
  );
};

export default FormattingToolbar;
