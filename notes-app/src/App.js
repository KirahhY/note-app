import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import { useState } from "react";

export default function App() {

  const [theme, setTheme] = useState("default")

  function handleTheme(theme){
    setTheme(theme)
  }

  return (
    <BrowserRouter>
      <Navbar 
        theme={theme}
        handleTheme={handleTheme}
      />
      <main className="Main">
        <Routes>
          <Route path="/" element={<Home theme={theme}/>} />
          <Route
            path="/notes/:id"
            element={<Home theme={theme}/>}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};