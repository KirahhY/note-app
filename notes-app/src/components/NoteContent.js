// Il faut trouver un moyen de sélectionner une note dans Sidebar et afficher le contenu ici

export default function NoteContent(props){
    console.log(props)
    return(
        <div>
            {props.selectedNote ? (
                <div>
                <h1>{props.selectedNote.title}</h1>
                <p>{props.selectedNote.content}</p>
                </div>
            ) : (
                <p>Sélectionnez une note pour afficher son contenu.</p>
            )}
        </div>
    )
}