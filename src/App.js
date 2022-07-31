import Main from "./components/pages/Main";
import Room from "./components/pages/inGame/Room";
import Lobby from "./components/pages/Lobby";
import Universe from "./components/pages/Universe";
import MakeRoom from "./components/pages/MakeRoom";
import MyPage from "./components/pages/myPage/MyPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRouter from "./components/common/AuthRouter";

function App()  {
    const AuthLobby = AuthRouter(Lobby);
    const AuthRoom = AuthRouter(Room);
    const AuthUniv = AuthRouter(Universe);
    const AuthMakeRoom = AuthRouter(MakeRoom);
    const AuthMyPage = AuthRouter(MyPage);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/univ" element={<AuthUniv/>}/>
                <Route path="/lobby" element={<AuthLobby/>}/>
                <Route path="/makeroom" element={<AuthMakeRoom/>}/>
                <Route path="/room/:roomID" element={<AuthRoom/>} />
                <Route path="/mypage" element={<AuthMyPage/>}/>
                
                {/* <Route path="/univ" element={<Universe/>}/>
                <Route path="/lobby" element={<Lobby/>}/>
                <Route path="/makeroom" element={<MakeRoom/>}/>
                <Route path="/room/:roomID" element={<Room/>} />
                <Route path="/mypage" element={<MyPage/>}/> */}
            </Routes>
        </Router>
    );
}

export default App;