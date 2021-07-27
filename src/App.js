import Header from "./components/Header";
import {RecoilRoot} from "recoil";
import Auth from "./pages/auth";
import Content from "./pages/content";
import useToken from "./components/useToken";
import DisplayProjectName from "./components/DisplayProjectName";


function App() {

    const { token, setToken } = useToken();

    if(!token) {
        return <Auth setToken={setToken} />
    }

    return (
        <RecoilRoot>
            <DisplayProjectName />
            <Header setToken={setToken} />
            <Content />
        </RecoilRoot>

    );
}

export default App;
