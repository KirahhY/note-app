// Il faut trouver un moyen de sélectionner une note dans Sidebar et afficher le contenu ici

export default function NoteContent(props){
    console.log(props)
    return(
        <div>
            {props.notes !== null
                ? props.notes.map((note) => (
                    <div>
                        <h3>{note.content}</h3>
                    </div>
                    ))
            : null}
        </div>
    )
}