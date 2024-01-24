import AddButton from "../images/newNote.png"
import Bin from "../images/trash-bin.png"

export default function Sidebar(props){
    return(
        <aside className="Side">

            <button className="button-create-note" onClick={props.AddNote}>
                <img src={AddButton} alt="add note logo" width="40px"/>
            </button>


            {props.notes !== null
            ? props.notes.map((note) => (
                <div className="Side-title-input-container"
                    key={note.id}
                    onClick={() => props.selectNote(note)}>
                        <h1>{note.title}</h1>
                        <input 
                            type="checkbox"  
                            // checked={note.checked || false}
                            checked={note.checked}
                            onChange={() => props.handleNoteChange(note.id)}
                            name="noteChecked"
                        ></input>
                </div>
                ))
            : null}

        </aside>
    )
}