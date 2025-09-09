import { useCallback } from 'react';
import Editor from './components/Editor/Editor';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

const LOCAL_STORAGE_KEY = 'inkveil-content';

function App() {
  const [content, setContent] = useLocalStorage(LOCAL_STORAGE_KEY, '');

  // Save handler
  const handleSave = useCallback(() => {
    console.log('Content saved!');
  }, []);

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
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl text-pink-300 font-semibold">Inkveil Editor</h1>
      </header>

      <main className="max-w-4xl mx-auto">
        <Editor content={content} onContentChange={setContent} />
      </main>
    </div>
  );
}

export default App;
