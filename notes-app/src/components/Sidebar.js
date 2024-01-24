import AddButton from "../images/newNote.png"
import Bin from "../images/trash-bin.png"
import Swal from 'sweetalert2'

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
                        <button className="button-delete-note"      onClick={() => {Swal.fire({
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