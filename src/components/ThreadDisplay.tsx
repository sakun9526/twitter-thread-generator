import React from "react";

interface ThreadDisplayProps {
  tweets: string[];
  setTweets: (tweets: string[]) => void;
}

const ThreadDisplay: React.FC<ThreadDisplayProps> = ({ tweets, setTweets }) => {
  const handleEdit = (index: number, newText: string) => {
    const updated = [...tweets];
    updated[index] = newText;
    setTweets(updated);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4 mt-6">
      {tweets.map((tweet, index) => (
        <div key={index} className="border p-4 rounded bg-white shadow text-gray-800 relative">
          <textarea
            className="w-full border rounded p-2 text-gray-800"
            value={tweet}
            onChange={(e) => handleEdit(index, e.target.value)}
            rows={Math.max(3, tweet.length / 50)}
          />
          <div className="text-sm text-right text-gray-500 mt-1">
            {tweet.length}/280 characters
          </div>
          <button
            onClick={() => copyToClipboard(tweet)}
            className="absolute top-2 right-2 text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Copy
          </button>
        </div>
      ))}
    </div>
  );
};

export default ThreadDisplay;
