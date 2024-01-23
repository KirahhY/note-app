import { useState, useEffect, useTransition } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import NoteContent from "./components/NoteContent";
import Navbar from "./components/Navbar";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Home from "./views/Home";

export default function App() {


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
    <BrowserRouter>
      <Navbar />
      <main className="Main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/notes/:id"
            element={<Home />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>

    // <div>
    //   <Navbar />
    //   <div className="container">
    //     <Sidebar 
    //       className="Sidebar"
    //       notes={notes} 
    //       AddNote={AddNote}
    //       selectNote={selectNote}
    //       selectedNote={selectedNote}
    //       noteChecked={noteChecked}
    //       handleChange={handleNoteCheck}
    //     />
    //     <NoteContent
    //       className="NoteContent" 
    //       notes={notes}
    //       AddNote={AddNote} 
    //       selectedNote={selectedNote}
    //       handleTitleChange={handleTitleChange}
    //     />
    //   </div>
    // </div>
  );
};