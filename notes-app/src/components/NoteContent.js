export default function NoteContent(props){
    return(
        <div className={`Editor-${props.theme}`}>
            {props.selectedNoteId ? (
                <form>
                    <input
                        className={`Editor-title-${props.theme}`} 
                        type="text"
                        value={props.selectedNoteTitle} 
                        placeholder="Aucun titre"
                        // onChange={(event) => props.handleTitleChange(event.target.value)}
                        onChange={(event) => props.setSelectedNoteTitle(event.target.value)}
                    />
                    <textarea
                        className={`Editor-content-${props.theme}`} 
                        placeholder="Écrivez ici"
                        value={props.selectedNoteContent}
                        onChange={(event) => props.setSelectedNoteContent(event.target.value)}
                    >
                    </textarea>
                </form>
            ) : (
                <p className={`Editor-message-${props.theme}`}>Sélectionnez une note pour afficher son contenu</p>
            )}
        </div>
    )
}