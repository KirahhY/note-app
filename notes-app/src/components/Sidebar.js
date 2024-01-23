import AddButton from "../images/newNote.png"

export default function Sidebar(props){
    return(
        <aside className="Side">
            <button className="Button-create-note" onClick={props.AddNote}>
                <img src={AddButton} alt="add note logo" width="30px"/>
            </button>

            {props.notes !== null
            ? props.notes.map((note) => (
                <div
                    // className={`title ${
                    //     note.id === props.selectedNote.id ? "selected-note" : ""
                    // }`} 
                    // buggé
                    key={note.id}
                    onClick={() => props.selectNote(note)}>
                        <div className="Side-title-input-container">
                            <h1>{note.title}</h1>
                            <input 
                                type="checkbox"  
                                // checked={note.checked || false}
                                checked={note.noteChecked}
                                onChange={() => props.handleChange(note.id)}
                                name="noteChecked"
                            ></input>
                        </div>
                </div>
                ))
            : null}

        </aside>
    )
}