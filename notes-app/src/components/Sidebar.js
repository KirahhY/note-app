export default function Sidebar(props){
    return(
        <aside className="Side">
            <button className="Button-create-note" onClick={props.AddNote}>
                <img src="../images/newNote.png" alt="add note logo"/>
            </button>

            {props.notes !== null
            ? props.notes.map((note) => (
                <div
                    // className={`title ${
                    //     note.id === props.selectedNote.id ? "selected-note" : ""
                    // }`} 
                    // buggé
                    onClick={() => props.selectNote(note)}>
                        <div className="Side-title-input-container">
                            <h1>{note.title}</h1>
                            <input 
                                type="checkbox"     
                                checked={props.noteChecked}
                                onChange={props.handleChange}
                                name="noteChecked"
                            ></input>
                        </div>
                        <h3>{note.content}</h3>
                </div>
                ))
            : null}
        </aside>
    )
}