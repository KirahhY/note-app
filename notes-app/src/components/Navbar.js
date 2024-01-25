import Logo from "../images/logo-note-app.png"

export default function Navbar(props){
    console.log(props.theme)
    return(
        <div className={`Navbar-${props.theme}`}>
            <img src={Logo} alt="Logo" height="60px"/>
            <h1>My notes</h1>
            <select className={`select-theme-${props.theme}`} 
                onChange={(event)=>{props.handleTheme(event.target.value)}}>
                <option value="" selected disabled>--Theme--</option> 
                <option value="default">Défaut</option>
                <option value="dark">Dark</option>
            </select>
        </div>
    )
}