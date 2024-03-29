import AddButton from "../images/newNote.png"
import Bin from "../images/trash-bin.png"
import Swal from 'sweetalert2'

export default function Sidebar(props){
    return(
        <aside className={`Sidebar-${props.theme}`}>

            <button 
                className={`button-create-note ${props.theme === "dark" ? "dark-mode-button" : ""}`} 
                onClick={props.AddNote}
            >
                <img src={AddButton} alt="add note logo" width="40px"/>
            </button>

            {props.notes !== null
            ? props.notes.map((note) => (
                <div className={`${note.id === props.selectedNoteId ? `selected-container-${props.theme}` : ""} Sidebar-input-container-${props.theme}`}
                    key={note.id}
                    onClick={() => props.selectNote(note)}>
                        <div className="Sidebar-title-bin">
                            <button className="button-delete-note"      
                                onClick={() => {Swal.fire({
                                    title: "Êtes vous sûr de vouloir supprimer la note?",
                                    text: "Vous ne pourrez pas revenir en arrière!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Oui, je confirme!",
                                    cancelButtonText: "Annuler"
                                    }).then((result) => {
                                    if (result.isConfirmed) {
                                        Swal.fire({
                                        title: "Supprimée!",
                                        text: "Votre note a été supprimée.",
                                        icon: "success"
                                        });
                                        props.deleteNote(note.id)
                                    }
                                });}}>
                                <img src={Bin} alt="delete note logo" width="30px"/>
                            </button>
                            <h1>{note.title.length >= 16 ? note.title.substring(0,13) + "..." : note.title.length === 0 ? "Aucun titre" : note.title}</h1>
                        </div>
                        <input className="Sidebar-checkbox"
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