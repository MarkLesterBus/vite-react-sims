import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navigation from "./components/navigation";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import FAQs from "./pages/faqs";
import About from "./pages/about";
import SVG from "./components/svg";

function App() {
  return (
    <div id="App" >
      <SVG />
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
