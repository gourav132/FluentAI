import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AutoComplete() {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const fetchSuggestion = async (text) => {
    if (!text.trim()) {
      setSuggestion([]);
      return;
    }

    try {
      const response = await fetch(
        "https://grammar-correction-and-sentence-building.onrender.com/auto-complete",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sentence: text }),
        }
      );
      const data = await response.json();
      let newData = data.completedSentence.replace(/```json|```/g, "").trim();
      newData = JSON.parse(newData);
      setSuggestion(newData);
    } catch (error) {
      console.error("Error fetching suggestion:", error);
    }
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        fetchSuggestion(text);
      }, 500)
    );
  };

  const handleSuggestionClick = (suggestedText) => {
    setInput((prevInput) => `${prevInput}${suggestedText}`);
    setSuggestion([]);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <motion.h1
        className="text-xl font-semibold text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Enhance Your Text, One Suggestion at a Time.
      </motion.h1>
      <motion.input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Start typing..."
        className="border border-zinc-700/40 w-full md:w-2xl mt-2 py-3 px-4 rounded-lg text-white bg-zinc-900/40 text-sm hover:ring-1 ring-offset-2 ring-offset-zinc-800 focus:ring-1 focus:outline-none ring-purple-500"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: suggestion.length > 0 ? -15 : 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      />
      <AnimatePresence>
        {suggestion.length > 0 && (
          <motion.div
            className="w-full md:w-2xl bg-zinc-900/80 mt-4 rounded-lg shadow-lg p-4 border border-zinc-800"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {suggestion.map((suggest, i) => (
              <motion.p
                key={i}
                className="text-gray-200 text-sm py-2 px-2 hover:bg-zinc-800 rounded cursor-pointer transition-colors duration-200"
                whileHover={{ scale: 1.02, backgroundColor: "#27272a" }}
                onClick={() =>
                  handleSuggestionClick(
                    suggest.completion || suggest.suggestion
                  )
                }
              >
                {suggest.completion || suggest.suggestion}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AutoComplete;
