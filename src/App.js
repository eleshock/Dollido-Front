import Main from "./components/pages/Main";
import MyVideo from "./components/pages/MyVideo";
import Room from "./components/pages/Room";
import Giftest from "./components/pages/Giftest";
import InGame from "./components/pages/InGame";
import Lobby from "./components/pages/Lobby";
import Test from "./components/pages/Test";
import Images from "./components/pages/Images";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App()  {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/myVideo" element={<MyVideo/>}></Route>
                <Route path="/gif_front" element={<Giftest/>}></Route>
                <Route path="/play" element={<InGame/>}></Route>
                <Route path="/lobby" element={<Lobby/>}></Route>
                <Route path="/room/:roomID" element={<Room/>} />
                <Route path="/test" element={<Test/>}/>
                <Route path="/images" element={<Images/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;