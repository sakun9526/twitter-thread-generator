import React from "react";

interface ThreadDisplayProps {
  tweets: string[];
}

const ThreadDisplay: React.FC<ThreadDisplayProps> = ({ tweets }) => {
  return (
    <div className="space-y-4 mt-6">
      {tweets.map((tweet, index) => (
        <div key={index} className="border p-4 rounded bg-white shadow text-gray-800">
          <p>{tweet}</p>
        </div>
      ))}
    </div>
  );
};

export default ThreadDisplay;
