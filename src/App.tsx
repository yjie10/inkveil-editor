import { useCallback } from 'react';

import Editor from './components/Editor/Editor';
import Toolbar from './components/Toolbar/ToolBar';
import { ToastProvider, useToast } from './contexts/ToastContext';

import { useLocalStorage } from './hooks/useLocalStorage';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

const LOCAL_STORAGE_KEY = 'inkveil-content';

function AppContent() {
  const [content, setContent] = useLocalStorage(LOCAL_STORAGE_KEY, '');
  const { showToast } = useToast();

  // Save handler
  const handleSave = useCallback(() => {
    // Content is automatically saved via useLocalStorage hook
    // Show success toast notification
    showToast({
      message: 'Content saved successfully!',
      type: 'success',
      duration: 2000,
    });
    console.log('Content saved!');
  }, [showToast]);

  // Setup save shortcut
  useKeyboardShortcuts([
    {
      key: 's',
      meta: true,
      ctrl: true,
      preventDefault: true,
      handler: handleSave,
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Minimal header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-medium text-slate-700">Inkveil Editor</h1>
          <div className="text-sm text-slate-500">
            {
              content
                .replace(/<[^>]*>/g, '')
                .trim()
                .split(/\s+/)
                .filter((word) => word.length > 0).length
            }{' '}
            words
          </div>
        </div>
      </header>

      {/* Main writing area */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Editor content={content} onContentChange={setContent} />
        <Toolbar content={content} onSave={handleSave} />
      </main>
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
