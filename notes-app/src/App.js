import { useState, useEffect, useTransition } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import NoteContent from "./components/NoteContent";
import Navbar from "./components/Navbar";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  const [notes, setNotes] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteChecked, SetNoteChecked] = useState(false)
  const [selectedNoteTitle, setSelectedNoteTitle] = useState(null)
  const [selectedNoteContent, setSelectedNoteContent] = useState(null)

  // save l'array notes (id, title, content) dans data 
  async function fetchNotes() {
    const response = await fetch("/notes"); // get par défaut
    const data = await response.json();
    setNotes(data);
  }
  
  async function AddNote() {
    const newNote = {
      title: "Nouvelle note " + (notes.length+1), 
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

  function handleNoteCheck(id) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, checked: !note.checked } : note
      )
    );
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

  async function handleTitleChange(newValue){
    await fetch(
      `/notes/${selectedNote.id}`,
      {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({title: newValue})
      }
    )
    fetchNotes()
  }

  // useEffect(() =>{
  //   if(selectedNote){
  //     setSelectedNoteTitle(selectedNote.title)
  //     setSelectedNoteContent(selectedNote.content)
  //   }
  // }, [selectedNote])

  // useEffect(()=> {
  //   handleTitleChange(selectedNoteTitle)
  // }, [selectedNoteTitle])

  return (
    // <BrowserRouter>

    //  <Sidebar 
    //     className="Sidebar"
    //     notes={notes} 
    //     AddNote={AddNote}
    //     selectNote={selectNote}
    //     selectedNote={selectedNote}
    //     noteChecked={noteChecked}
    //     handleChange={handleNoteCheck}
    //   />

    //   <main className="Main">
    //     <Routes>
    //       <Route path="/" element="Sélectionner une note" />
    //       <Route
    //         path="/notes/:id"
    //         element={<NoteContent
    //                   className="NoteContent" 
    //                   notes={notes} 
    //                   AddNote={AddNote} 
    //                   selectedNote={selectedNote}
    //                 />
    //         }
    //       />

    //       <Route path="*" element={<Navigate to="/" />} />
    //     </Routes>
    //   </main>
    // </BrowserRouter>

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
          handleChange={handleNoteCheck}
        />
        <NoteContent
          className="NoteContent" 
          notes={notes}
          AddNote={AddNote} 
          selectedNote={selectedNote}
          handleTitleChange={handleTitleChange}
        />
      </div>
    </div>
  );
};