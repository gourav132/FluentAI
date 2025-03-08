import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CorrectGrammar() {
  const [input, setInput] = useState("");
  const [corrections, setCorrections] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const fetchCorrections = async (text) => {
    if (!text.trim()) {
      setCorrections([]);
      return;
    }

    try {
      const response = await fetch(
        "https://grammar-correction-and-sentence-building.onrender.com/correct-grammar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sentence: text }),
        }
      );
      const data = await response.json();
      let newData = data.correctedSentence.replace(/```json|```/g, "").trim();
      console.log(newData);
      newData = JSON.parse(newData);
      console.log(newData);
      setCorrections(newData);
    } catch (error) {
      console.error("Error fetching corrections:", error);
    }
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        fetchCorrections(text);
      }, 500)
    );
  };

  const handleCorrectionClick = (correctedText) => {
    setInput(correctedText);
    setCorrections([]);
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center max-h-8/12">
      <motion.h1
        className="text-xl font-semibold text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Perfect Your Grammar Instantly
      </motion.h1>
      <motion.textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Enter your text for grammar check..."
        className="border border-zinc-700/40 w-full md:w-2xl mt-2 py-3 px-4 rounded-lg text-white bg-zinc-900/40 text-sm hover:ring-1 ring-offset-2 ring-offset-zinc-800 focus:ring-1 focus:outline-none ring-purple-500 min-h-[120px] resize-y"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: corrections.length > 0 ? -15 : 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      />
      <AnimatePresence>
        {corrections.length > 0 && (
          <motion.div
            className="w-full md:w-2xl bg-zinc-900/80 mt-4 rounded-lg shadow-lg p-4 border border-zinc-800 text-white"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {corrections.map((correction, i) => (
              <motion.div
                key={i}
                className="text-gray-200 text-sm py-2 px-2 hover:bg-zinc-800 rounded cursor-pointer transition-colors duration-200"
                whileHover={{ scale: 1.02, backgroundColor: "#27272a" }}
                onClick={() => handleCorrectionClick(correction.option)}
              >
                <p className="text-gray-300 mt-1">{correction.option}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CorrectGrammar;
