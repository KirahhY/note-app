import { useEffect, useState } from "react";
import NoteContent from "../components/NoteContent";
import Sidebar from "../components/Sidebar";

export default function Home(props){
    const [notes, setNotes] = useState([])
    const [selectedNoteId, setSelectedNoteId] = useState("")
    const [selectedNoteTitle, setSelectedNoteTitle] = useState("")
    const [selectedNoteContent, setSelectedNoteContent] = useState("")

    const sortedNotes = notes.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    // save l'array notes (id, title, content) dans data 
    async function fetchNotes() {
      const response = await fetch("/notes"); // get par défaut
      const data = await response.json();
      setNotes(data);
    }
    
    async function AddNote() {
      const newNote = {
        title: "Nouvelle note", 
        content: "",
        checked: false,
        updatedAt: new Date(),
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
                body: JSON.stringify({ checked: !updatedNote.checked, updatedAt: new Date() }), // Inverse l'état actuel
            });
        }
    }

    async function handleNoteTitle(id, newValue) {
        // pour modifier la bonne note dans notre State
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, title: newValue, updatedAt: new Date() } : note
            )
        );
      
        // updateNote correspond à la note qu'on veut modif dans la db
        const updatedNote = notes.find((note) => note.id === id);
        // Pour modifier dans la db
        if (updatedNote) {
            await fetch(`/notes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newValue, updatedAt: new Date() }), 
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

    const deleteNote = async function (id) {
        await fetch(
            `/notes/${id}`,
            {
                method: 'DELETE',
            }
        )
        fetchNotes()
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
                notes={sortedNotes} 
                AddNote={AddNote}
                selectNote={selectNote}
                handleNoteChange={handleNoteCheck}
                deleteNote={deleteNote}
                theme={props.theme}
                />
                <NoteContent className="NoteContent" 
                selectedNoteId={selectedNoteId}
                selectedNoteTitle={selectedNoteTitle}
                selectedNoteContent={selectedNoteContent}
                setSelectedNoteTitle={setSelectedNoteTitle}
                setSelectedNoteContent={setSelectedNoteContent}
                theme={props.theme}
                />
            </div>
        </div>
    )
}               