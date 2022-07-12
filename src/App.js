import Main from "./components/pages/Main";
import Test from "./components/pages/Test";
import Giftest from "./components/pages/Giftest";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App()  {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/roomList" element={<Test/>}></Route>
                <Route path="/gif_front" element={<Giftest/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;