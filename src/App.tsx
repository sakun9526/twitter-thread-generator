import { useState } from "react";
import { splitIntoTweets } from "./utils/splitter";
import ThreadDisplay from "./components/ThreadDisplay";

function App() {
  const [input, setInput] = useState("");
  const [tweets, setTweets] = useState<string[]>([]);

  const handleGenerate = () => {
    const result = splitIntoTweets(input);
    setTweets(result);
  };

  const exportAsJSON = () => {
    const blob = new Blob([JSON.stringify(tweets, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, "tweets.json");
  };

  const exportAsText = () => {
    const blob = new Blob([tweets.join("\n\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, "tweets.txt");
  };

  const triggerDownload = (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
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

        {tweets.length > 0 && (
          <>
            <div className="flex gap-4 mt-6">
              <button
                onClick={exportAsJSON}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Export as JSON
              </button>
              <button
                onClick={exportAsText}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
              >
                Export as Text
              </button>
            </div>
            <ThreadDisplay tweets={tweets} setTweets={setTweets} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
