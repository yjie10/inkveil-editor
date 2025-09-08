import { useEffect, useRef } from 'react';

type EditorProps = {
  onContentChange?: (html: string) => void;
};

// const handleFormat = (cmd: 'bold' | 'italic' | 'underline') => {
//   document.execCommand(cmd, false);
// };

const Editor = ({ onContentChange }: EditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    const handleKeydown = (e: KeyboardEvent) => {
      const isMac = navigator.userAgent.toLowerCase().includes('mac');
      const isModifier = isMac ? e.metaKey : e.ctrlKey;

      if (isModifier && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        document.execCommand('bold');
      }

      if (isModifier && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        document.execCommand('italic');
      }

      if (isModifier && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        document.execCommand('underline');
      }
    };

    const handleInput = () => {
      onContentChange?.(el.innerHTML);
    };

    el.addEventListener('input', handleInput);

    el.addEventListener('keydown', handleKeydown);
    return () => {
      el.removeEventListener('input', handleInput);
      el.removeEventListener('keydown', handleKeydown);
    };
  }, [onContentChange]);

  return (
    <div>
      {/* <div className="flex gap-2 mb-2">
        <button onClick={() => handleFormat('bold')}>
          <strong>B</strong>
        </button>
        <button onClick={() => handleFormat('italic')}>
          <i>I</i>
        </button>
        <button onClick={() => handleFormat('underline')}>
          <u>U</u>
        </button>
      </div> */}
      <div
        ref={editorRef}
        contentEditable
        className="w-full h-80 p-3 font-serif rounded-lg border border-zinc-700 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        suppressContentEditableWarning
      ></div>
    </div>
  );
};

export default Editor;
