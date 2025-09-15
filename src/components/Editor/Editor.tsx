import { useEffect, useRef, useCallback } from 'react';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { editorCommands } from '../../utils/editorCommands';
import { EditorProps } from '../../types';

const Editor = ({ content, onContentChange }: EditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  // Handle content changes
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
  }, [onContentChange]);

  // Setup keyboard shortcuts for formatting
  useKeyboardShortcuts([
    {
      key: 'b',
      meta: true,
      ctrl: true,
      preventDefault: true,
      handler: editorCommands.bold,
    },
    {
      key: 'i',
      meta: true,
      ctrl: true,
      preventDefault: true,
      handler: editorCommands.italic,
    },
    {
      key: 'u',
      meta: true,
      ctrl: true,
      preventDefault: true,
      handler: editorCommands.underline,
    },
  ]);

  // Setup editor event listeners
  useEffect(() => {
    const element = editorRef.current;
    if (!element) return;

    element.addEventListener('input', handleInput);

    return () => {
      element.removeEventListener('input', handleInput);
    };
  }, [handleInput]);

  return (
    <div className="editor-container">
      <div
        ref={editorRef}
        contentEditable
        className="w-full min-h-[600px] p-8 bg-white border border-slate-200 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   text-slate-800 leading-relaxed text-lg
                   font-serif selection:bg-blue-100
                   prose prose-lg max-w-none prose-slate
                   prose-headings:text-slate-800 prose-headings:font-semibold
                   prose-p:text-slate-700 prose-p:leading-relaxed
                   prose-strong:text-slate-800 prose-strong:font-semibold
                   prose-em:text-slate-700 prose-em:italic"
        suppressContentEditableWarning
        spellCheck
        role="textbox"
        aria-label="Rich text editor"
        placeholder="Start writing your story..."
      />
    </div>
  );
};

export default Editor;
