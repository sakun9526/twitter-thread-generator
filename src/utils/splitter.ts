export function splitIntoTweets(text: string, maxLength = 280): string[] {
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  const tweets: string[] = [];
  let currentTweet = "";

  for (const sentence of sentences) {
    if ((currentTweet + sentence).length <= maxLength) {
      currentTweet += sentence;
    } else {
      if (currentTweet) tweets.push(currentTweet.trim());
      if (sentence.length > maxLength) {
        // Break long sentence into chunks
        for (let i = 0; i < sentence.length; i += maxLength) {
          tweets.push(sentence.slice(i, i + maxLength));
        }
        currentTweet = "";
      } else {
        currentTweet = sentence;
      }
    }
  }

  if (currentTweet) tweets.push(currentTweet.trim());

  return tweets.map((tweet, idx) => `${tweet} (${idx + 1}/${tweets.length})`);
}
