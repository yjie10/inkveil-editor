import { useCallback } from 'react';

import Editor from './components/Editor/Editor';
import Toolbar from './components/Toolbar/ToolBar';
import { ToastProvider } from './contexts/ToastContext';

import { useLocalStorage } from './hooks/useLocalStorage';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useFileOperations } from './hooks/useFileOperations';

const LOCAL_STORAGE_KEY = 'inkveil-content';

function AppContent() {
  const [content, setContent] = useLocalStorage(LOCAL_STORAGE_KEY, '');
  const {
    saveFile,
    saveAsFile,
    openFile,
    markAsChanged,
    getFileName,
    fileState,
    newDocument,
  } = useFileOperations();

  // Clear localStorage when a file is successfully saved
  const clearTemporaryContent = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  // Save handler
  const handleSave = useCallback(async () => {
    const success = await saveFile(content);
    if (success) {
      clearTemporaryContent();
    }
  }, [saveFile, content, clearTemporaryContent]);

  // Save As handler
  const handleSaveAs = useCallback(async () => {
    const success = await saveAsFile(content);
    if (success) {
      clearTemporaryContent();
    }
  }, [saveAsFile, content, clearTemporaryContent]);

  // Open file handler
  const handleOpen = useCallback(async () => {
    const result = await openFile();
    if (result) {
      setContent(result.content);
      clearTemporaryContent(); // Clear any temporary content when opening a file
    }
  }, [openFile, setContent, clearTemporaryContent]);

  // New document handler
  const handleNewDocument = useCallback(() => {
    setContent('');
    newDocument();
    clearTemporaryContent();
  }, [setContent, newDocument, clearTemporaryContent]);

  // Content change handler
  const handleContentChange = useCallback(
    (newContent: string) => {
      setContent(newContent);
      markAsChanged();
    },
    [setContent, markAsChanged]
  );

  // Setup keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'n',
      meta: true,
      ctrl: true,
      preventDefault: true,
      handler: handleNewDocument,
    },
    {
      key: 's',
      meta: true,
      ctrl: true,
      preventDefault: true,
      handler: handleSave,
    },
    {
      key: 's',
      meta: true,
      ctrl: true,
      shift: true,
      preventDefault: true,
      handler: handleSaveAs,
    },
    {
      key: 'o',
      meta: true,
      ctrl: true,
      preventDefault: true,
      handler: handleOpen,
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Minimal header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto">
          {/* Top row - App name and file info */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-medium text-slate-700 whitespace-nowrap">
                Inkveil Editor
              </h1>
              <span className="text-sm text-slate-500 hidden sm:inline">•</span>
              <span className="text-sm text-slate-600 font-medium truncate">
                {getFileName()}
                {fileState.hasUnsavedChanges && (
                  <span className="text-orange-500 ml-1">*</span>
                )}
              </span>
            </div>
          </div>

          {/* Bottom row - Stats and status */}
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span className="whitespace-nowrap">
              {
                content
                  .replace(/<[^>]*>/g, '')
                  .trim()
                  .split(/\s+/)
                  .filter((word) => word.length > 0).length
              }{' '}
              words
            </span>
            <div className="flex items-center gap-1">
              {fileState.isSaved && !fileState.hasUnsavedChanges && (
                <span className="flex items-center gap-1 text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="hidden sm:inline">Saved</span>
                </span>
              )}
              {fileState.hasUnsavedChanges && (
                <span className="flex items-center gap-1 text-orange-600">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="hidden sm:inline">Unsaved changes</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main writing area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Editor content={content} onContentChange={handleContentChange} />
        <Toolbar
          content={content}
          onNew={handleNewDocument}
          onSave={handleSave}
          onSaveAs={handleSaveAs}
          onOpen={handleOpen}
        />
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
