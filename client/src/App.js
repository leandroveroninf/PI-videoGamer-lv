import "./App.css";
import { Routes, Route } from "react-router-dom";
import FirstPage from "./components/FirstPage/FirstPage";
import Home from "./components/Home/Home";
import CreateVideoGamer from "./components/CreateVideoGamer/CreateVideoGamer";
import Detalles from "./components/Detalles/Detalles";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<FirstPage />} />
        <Route exact path="/home/addVideoGame" element={<CreateVideoGamer />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/home/:id" element={<Detalles />} />
      </Routes>
    </div>
  );
}

export default App;
