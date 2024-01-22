import { useState, useEffect, useTransition } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import NoteContent from "./components/NoteContent";
import Navbar from "./components/Navbar";

export default function App() {
  const [notes, setNotes] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteChecked, SetNoteChecked] = useState(false)

  // save l'array notes (id, title, content) dans data 
  async function fetchNotes() {
    const response = await fetch("/notes"); // get par défaut
    const data = await response.json();
    setNotes(data);
  }
  
  async function AddNote() {
    const newNote = {
      title: "Note " + (notes.length+1), 
      content: "Écrivez ici",
    };
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

  function handleChange(){
    SetNoteChecked(prevNoteChecked => !prevNoteChecked)
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <Sidebar 
        className="Sidebar"
          notes={notes} 
          AddNote={AddNote}
          selectNote={selectNote}
          selectedNote={selectedNote}
          noteChecked={noteChecked}
          handleChange={handleChange}
        />
        <NoteContent
          className="NoteContent" 
          notes={notes} 
          AddNote={AddNote} 
          selectedNote={selectedNote}
        />
      </div>
    </div>
  );
};