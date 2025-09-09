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
        className="w-full h-80 p-3 font-serif rounded-lg border border-zinc-700 bg-zinc-800 
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 
                   prose prose-invert max-w-none"
        suppressContentEditableWarning
        spellCheck
        role="textbox"
        aria-label="Rich text editor"
      />
    </div>
  );
};

export default Editor;
