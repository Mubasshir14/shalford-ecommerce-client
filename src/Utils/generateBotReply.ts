// import Fuse from "fuse.js";
// import chatData from "../data/chatData.json";

// interface ChatEntry {
//   keyword: string;
//   reply: string;
// }

// const fuse = new Fuse<ChatEntry>(chatData, {
//   keys: ["keyword"],
//   threshold: 0.4
// });

// export const generateBotReply = (userInput: string): string => {
//   const msg = userInput.toLowerCase().trim();
//   const result = fuse.search(msg);

//   if (result.length > 0) {
//     return result[0].item.reply;
//   }

//   if (msg.includes("hi") || msg.includes("hello"))
//     return "Hello! 👋 How can I help you today?";
//   if (msg.includes("thanks"))
//     return "You're most welcome! 😊";
//   if (msg.includes("bye"))
//     return "Goodbye! Have a great day! 👋";

//   return "I'm not sure I understand. Could you please rephrase?";
// };

import Fuse from "fuse.js";
import chatData from "../data/chatData.json";

interface ChatEntry {
  keyword: string;
  reply: string;
}

const fuse = new Fuse<ChatEntry>(chatData, {
  keys: ["keyword"],
  threshold: 0.4,
});

export const generateBotReply = (userInput: string): string => {
  const msg = userInput.toLowerCase().trim();

  // 1️⃣ Split user input into words
  const words = msg.split(/\s+/); // split by space

  // 2️⃣ Check each word for match
  for (const word of words) {
    const result = fuse.search(word);
    if (result.length > 0) {
      return result[0].item.reply; // return first match
    }
  }

  // 3️⃣ Optionally, check whole message for multi-word keyword
  const fullResult = fuse.search(msg);
  if (fullResult.length > 0) {
    return fullResult[0].item.reply;
  }

  // 4️⃣ Default replies
  if (msg.includes("hi") || msg.includes("hello"))
    return "Hello! 👋 How can I help you today?";
  if (msg.includes("thanks"))
    return "You're most welcome! 😊";
  if (msg.includes("bye"))
    return "Goodbye! Have a great day! 👋";

  return "I'm not sure I understand. Could you please rephrase?";
};
