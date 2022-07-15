import Main from "./components/pages/Main";
import Test from "./components/pages/MyVideo";
import Room from "./components/pages/Room";
import Giftest from "./components/pages/Giftest";
import InGame from "./components/pages/InGame";
import Lobby from "./components/pages/Lobby";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App()  {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/test" element={<Test/>}></Route>
                <Route path="/gif_front" element={<Giftest/>}></Route>
                <Route path="/play" element={<InGame/>}></Route>
                <Route path="/lobby" element={<Lobby/>}></Route>
                <Route path="/room/:roomID" element={<Room/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;