import { useState } from "react";

export default function Sidebar(props){
    return(
        <aside className="Side">
            <button className="Button-create-note" onClick={props.AddNote}>
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