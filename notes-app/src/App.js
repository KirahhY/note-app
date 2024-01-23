import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Home from "./views/Home";

export default function App() {


  // useEffect(() =>{
  //   if(selectedNote){
  //     setSelectedNoteTitle(selectedNote.title)
  //     setSelectedNoteContent(selectedNote.content)
  //   }
  // }, [selectedNote])

  // useEffect(()=> {
  //   handleTitleChange(selectedNoteTitle)
  // }, [selectedNoteTitle])

  return (
    <BrowserRouter>
      <Navbar />
      <main className="Main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/notes/:id"
            element={<Home />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};