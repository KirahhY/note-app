import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import NoteContent from "./components/NoteContent";

export default function App() {
  const [notes, setNotes] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  // save l'array notes (id, title, content) dans data 
  async function fetchNotes() {
    const response = await fetch("/notes"); // get par défaut
    const data = await response.json();
    setNotes(data);
  }
  
// le compteur est buggé, si page refresh le compteur repart à 1
  const [noteCount, setNoteCount] = useState(1)
  async function AddNote() {
    const newNote = {
      title: "Note " + noteCount, 
      content: "Écrivez ici",
    };
    setNoteCount(prevNoteCount => prevNoteCount + 1)
    const requestOptions = {
      method: "POST", // à voir => utiliser patch (modif) ou get (get par défaut)
      headers: { "Content-Type": "application/json" }, // à mettre dans toutes les requêtes
      body: JSON.stringify(newNote), // pareil
    };
    const response = await fetch("/notes", requestOptions);
    fetchNotes();
  }

  // s'exécute au début du programme
  useEffect(function () {
    fetchNotes();
  }, []);

  const selectNote = (note) => {
    setSelectedNote(note);
  };

  return (
    <div className="container">
      <Sidebar 
      className="Sidebar"
        notes={notes} 
        AddNote={AddNote}
        selectNote={selectNote}
      />
      <NoteContent
        className="NoteContent" 
        notes={notes} 
        AddNote={AddNote} 
        selectedNote={selectedNote}
      />
    </div>
  );
};