function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome to Inkveil</h1>
      <textarea
        className="w-full h-80 p-3 font-mono rounded-lg border border-zinc-700 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Start writing..."
      />
    </div>
  );
}

export default App;
