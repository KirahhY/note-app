import { useState } from "react";

export default function Sidebar(props){
    const [noteCount, setNoteCount] = useState(1)
    async function AddNote() {
      const newNote = {
        title: "Note " + noteCount, 
        content: "note",
      };
      setNoteCount(prevNoteCount => prevNoteCount + 1)
      const requestOptions = {
        method: "POST", // à voir => utiliser patch (modif) ou get (get par défaut)
        headers: { "Content-Type": "application/json" }, // à mettre dans toutes les requêtes
        body: JSON.stringify(newNote), // pareil
      };
      const response = await fetch("/notes", requestOptions);
      props.fetchNotes();
    }

    return(
        <aside className="Side">
            <button className="Button-create-note" onClick={AddNote}>
            +
            </button>
            {props.notes !== null
            ? props.notes.map((note) => (
                <div>
                    <h1>{note.title}</h1>
                    <h3>{note.content}</h3>
                </div>
                ))
            : null}
        </aside>
    )
}