// Il faut trouver un moyen de sélectionner une note dans Sidebar et afficher le contenu ici

export default function NoteContent(props){
    return(
        <div className="Editor">
            {props.selectedNote ? (
                <div>
                    <h1 className="Editor-title">{props.selectedNote.title}</h1>
                    <p className="Editor-content">{props.selectedNote.content}</p>
                </div>
            ) : (
                <p className="Editor-message">Sélectionnez une note pour afficher son contenu</p>
            )}
        </div>
    )
}