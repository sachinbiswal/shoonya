import { Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/home/HomePage";
import { RetreatPage } from "./pages/retreatPage/retreatPage";

function App() {
  return (
    <div className="App">
      <div className={`header`}>
        <span>Wellness Retreats</span>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/retreats/:id" element={<RetreatPage />} />
      </Routes>
      <footer>©2024 Wellness Retreats</footer>
    </div>
  );
}

export default App;
