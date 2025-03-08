import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AutoComplete from "./AutoComplete";
import CorrectGrammar from "./CorrectGrammar";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen w-fill bg-linear-65 from-purple-500 to-pink-500 flex items-center justify-center flex-col relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/auto-complete" replace />} />
          <Route path="/auto-complete" element={<AutoComplete />} />
          <Route path="/grammar" element={<CorrectGrammar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
