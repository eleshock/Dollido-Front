import Main from "./components/pages/Main";
import Test from "./components/pages/Test";
import Room from "./components/pages/Room";
import Test from "./components/pages/Test";
import Giftest from "./components/pages/Giftest";
import InGame from "./components/pages/InGame"
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App()  {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/test" element={<Test/>}></Route>
                <Route path="/room" element={<Room/>}></Route>
                <Route path="/gif_front" element={<Giftest/>}></Route>
                <Route path="/play" element={<InGame/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;