import Main from "./components/pages/Main";
import Room from "./components/pages/inGame/Room";
import Lobby from "./components/pages/Lobby";
import Images from "./components/pages/myPage/Images";
import Universe from "./components/pages/Universe";
import MakeRoom from "./components/pages/MakeRoom";
import MyPage from "./components/pages/myPage/MyPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import useSound2 from './components/pages/useSound2'
import mainTheme from './sounds/BGM/main_theme.mp3'

function App()  {

    // useSound2(mainTheme, 1, 2000);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/lobby" element={<Lobby/>}/>
                <Route path="/room/:roomID" element={<Room/>} />
                <Route path="/images" element={<Images/>}/>
                <Route path="/univ" element={<Universe/>}/>
                <Route path="/makeroom" element={<MakeRoom/>}/>
                <Route path="/mypage" element={<MyPage/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;