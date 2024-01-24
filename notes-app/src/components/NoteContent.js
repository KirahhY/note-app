export default function NoteContent(props){
    return(
        <div className="Editor">
            {props.selectedNoteId ? (
                <form>
                    <input 
                        className="Editor-title" 
                        type="text"
                        value={props.selectedNoteTitle} 
                        // onChange={(event) => props.handleTitleChange(event.target.value)}
                        onChange={(event) => props.setSelectedNoteTitle(event.target.value)}
                    />
                    <textarea 
                        className="Editor-content" 
                        value={props.selectedNoteContent}
                        onChange={(event) => props.setSelectedNoteContent(event.target.value)}
                    >
                    </textarea>
                </form>
            ) : (
                <p className="Editor-message">Sélectionnez une note pour afficher son contenu</p>
            )}
        </div>
    )
}