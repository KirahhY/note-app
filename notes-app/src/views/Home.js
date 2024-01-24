import { useEffect, useState } from "react";
import NoteContent from "../components/NoteContent";
import Sidebar from "../components/Sidebar";

export default function Home(){
    const [notes, setNotes] = useState(null)
    const [selectedNote, setSelectedNote] = useState(null)
  
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
        checked: false,
      };
      const requestOptions = {
        method: "POST", // à voir => utiliser patch (modif) ou get (get par défaut)
        headers: { "Content-Type": "application/json" }, // à mettre dans toutes les requêtes
        body: JSON.stringify(newNote), // pareil
      };
      const response = await fetch("/notes", requestOptions);
      fetchNotes();
    }

    async function handleNoteCheck(id) {
        // on parcours nos notes, si l'id de la note correspond à l'id de la note checkée, on inverse l'état de la propriété checked sinon on retourne juste note
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === id ? { ...note, checked: !note.checked } : note
          )
        );
      
        // Mettre à jour l'état côté serveur via une requête PATCH
        const updatedNote = notes.find((note) => note.id === id);
      
        if (updatedNote) {
          await fetch(`/notes/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ checked: !updatedNote.checked }), // Inverse l'état actuel
          });
        }
      }

  
    // s'exécute au début du programme
    useEffect(function () {
      fetchNotes();
    }, []);
  
    const selectNote = (note) => {
      setSelectedNote(note);
    };
  
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
    return(
        <div>
            <div className="container">
                <Sidebar className="Sidebar"
                notes={notes} 
                AddNote={AddNote}
                selectNote={selectNote}
                selectedNote={selectedNote}
                handleNoteChange={handleNoteCheck}
                />
                <NoteContent className="NoteContent" 
                notes={notes}
                AddNote={AddNote} 
                selectedNote={selectedNote}
                handleTitleChange={handleTitleChange}
                />
            </div>
        </div>
    )
}               