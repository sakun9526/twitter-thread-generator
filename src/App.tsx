import { useState } from 'react';
import { splitIntoTweets } from './utils/splitter';
import ThreadDisplay from './components/ThreadDisplay';

function App() {
  const [input, setInput] = useState('');
  const [tweets, setTweets] = useState<string[]>([]);

  const handleGenerate = () => {
    const result = splitIntoTweets(input);
    setTweets(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Twitter Thread Generator</h1>
        <textarea
          className="w-full p-3 border rounded resize-none min-h-[150px] text-gray-800"
          placeholder="Paste your long paragraph here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Generate Thread
        </button>

        {tweets.length > 0 && <ThreadDisplay tweets={tweets} />}
      </div>
    </div>
  );
}

export default App;
