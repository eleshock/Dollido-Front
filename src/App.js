import Main from "./components/pages/Main";
import Room from "./components/pages/inGame/Room";
import Lobby from "./components/pages/Lobby";
import Images from "./components/pages/Images";
import Universe from "./components/pages/Universe";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App()  {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/lobby" element={<Lobby/>}/>
                <Route path="/room/:roomID" element={<Room/>} />
                <Route path="/images" element={<Images/>}/>
                <Route path="/univ" element={<Universe/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;