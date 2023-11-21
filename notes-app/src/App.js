import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState(null);
  async function fetchNotes() {
    const response = await fetch("/notes");
    const data = await response.json();
    setNotes(data.reverse());
  }

  async function AddNote() {
    const newNote = {
      title: "Nouvelle note",
      content: "note",
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    };

    const response = await fetch("/notes", requestOptions);

    fetchNotes();
  };

  useEffect(function () {
    fetchNotes();
  }, []);

  return (
    <div>
      <aside className="Side">
        <button className="Button-create-note" onClick={AddNote}>
          +
        </button>
        {notes !== null
          ? notes.map((note) => (
              <div>
                <h1>{note.title}</h1>
                <h3>{note.content}</h3>
              </div>
            ))
          : null}

      </aside>
      <main className="Main"></main>
    </div>
  );
};