import Main from "./components/pages/Main";
import Test from "./components/pages/Test";
import Room from "./components/pages/Room";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

function App()  {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/test" element={<Test/>}></Route>
                <Route path="/room" element={<Room/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;