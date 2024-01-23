import Logo from "../images/logo-note-app.png"

export default function Navbar(){

    return(
        <div className="Navbar">
            <img src={Logo} alt="Logo" height="60px"/>
            <h1>My notes</h1>
            <select className="select-theme">
                <option value="">--Theme--</option>
                <option value="default">Original</option>
                <option value="dark">Dark</option>
                <option value="???">???</option>
            </select>
        </div>
    )
}