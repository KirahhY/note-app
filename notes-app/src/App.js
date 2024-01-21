import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [notes, setNotes] = useState(null);

  // save l'array notes (id, title, content) dans data 
  async function fetchNotes() {
    const response = await fetch("/notes"); // get par défaut
    const data = await response.json();
    setNotes(data);
  }
  



  // s'exécute au début du programme
  useEffect(function () {
    fetchNotes();
  }, []);

  return (
    <div>

      <Sidebar fetchNotes={fetchNotes} notes={notes}/>
      <main className="Main"></main>
    </div>
  );
};