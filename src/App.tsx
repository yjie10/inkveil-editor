import Editor from './components/Editor/Editor';

function App() {
  const handleSave = (content: string) => {
    console.log('Save content:', content);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-6">
      <h1 className="text-2xl text-pink-300 font-semibold mb-4">
        Inkveil Editor
      </h1>
      <Editor onContentChange={handleSave} />
    </div>
  );
}

export default App;
