export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Renuds
        </h1>
        <p className="text-xl text-gray-400 font-medium">
          AI/ML Research &amp; Deployment Knowledge
        </p>
        <p className="text-gray-500 text-base max-w-lg mx-auto">
          RAG over the AI/ML research and deployment canon. Ask technical AI
          questions, get grounded answers with citations.
        </p>
        <div className="pt-4">
          <input
            type="text"
            placeholder="Ask a technical AI question..."
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-500 text-sm"
            disabled
          />
          <p className="text-xs text-gray-600 mt-2">Coming soon — v0.1 ships Day 14</p>
        </div>
      </div>
    </main>
  );
}
