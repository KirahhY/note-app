import { useEffect, useState } from "react";
import NoteContent from "../components/NoteContent";
import Sidebar from "../components/Sidebar";

export default function Home(){
    const [notes, setNotes] = useState([])
    const [selectedNoteId, setSelectedNoteId] = useState("")
    const [selectedNoteTitle, setSelectedNoteTitle] = useState("")
    const [selectedNoteContent, setSelectedNoteContent] = useState("")
  
    // save l'array notes (id, title, content) dans data 
    async function fetchNotes() {
      const response = await fetch("/notes"); // get par défaut
      const data = await response.json();
      setNotes(data);
    }
    
    async function AddNote() {
      const newNote = {
        title: "Nouvelle note ", 
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
        // pour modifier la bonne note dans notre State
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, checked: !note.checked } : note
            )
        );
      
        // updateNote correspond à la note qu'on veut modif dans la db
        const updatedNote = notes.find((note) => note.id === id);
        // Pour modifier dans la db
        if (updatedNote) {
            await fetch(`/notes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ checked: !updatedNote.checked }), // Inverse l'état actuel
            });
        }
    }

    async function handleNoteTitle(id, newValue) {
        // pour modifier la bonne note dans notre State
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, title: newValue } : note
            )
        );
      
        // updateNote correspond à la note qu'on veut modif dans la db
        const updatedNote = notes.find((note) => note.id === id);
        // Pour modifier dans la db
        if (updatedNote) {
            await fetch(`/notes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newValue }), 
            });
        }
    }

    async function handleNoteContent(id, newValue) {
        // pour modifier la bonne note dans notre State
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, content: newValue } : note
            )
        );
      
        // updateNote correspond à la note qu'on veut modif dans la db
        const updatedNote = notes.find((note) => note.id === id);
        // Pour modifier dans la db
        if (updatedNote) {
            await fetch(`/notes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newValue }), 
            });
        }
    }

    // s'exécute au début du programme
    useEffect(function () {
      fetchNotes();
    }, []);
  
    const selectNote = (note) => {
      setSelectedNoteId(note.id);
      setSelectedNoteTitle(note.title);
      setSelectedNoteContent(note.content);
    };

    useEffect(function () {
        const timeoutId = setTimeout(() => {
            handleNoteTitle(selectedNoteId, selectedNoteTitle)
            handleNoteContent(selectedNoteId, selectedNoteContent)
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [selectedNoteTitle, selectedNoteContent]);

    return(
        <div>
            <div className="container">
                <Sidebar className="Sidebar"
                notes={notes} 
                AddNote={AddNote}
                selectNote={selectNote}
                handleNoteChange={handleNoteCheck}
                />
                <NoteContent className="NoteContent" 
                selectedNoteId={selectedNoteId}
                selectedNoteTitle={selectedNoteTitle}
                selectedNoteContent={selectedNoteContent}
                setSelectedNoteTitle={setSelectedNoteTitle}
                setSelectedNoteContent={setSelectedNoteContent}
                />
            </div>
        </div>
    )
}               