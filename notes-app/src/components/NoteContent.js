export default function NoteContent(props){
    return(
        <div className="Editor">
            {props.selectedNote ? (
                <form>
                    <input 
                        className="Editor-title" 
                        value={props.selectedNote.title} 
                        // onChange={(event) => props.handleTitleChange(event.target.value)}
                        onChange={(event) => props.handleTitleChange(event.target.value)}
                    />
                    <textarea className="Editor-content" value={props.selectedNote.content}></textarea>
                </form>
            ) : (
                <p className="Editor-message">Sélectionnez une note pour afficher son contenu</p>
            )}
        </div>
    )
}