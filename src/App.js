import Header from "./components/Header";
import {RecoilRoot} from "recoil";
import Auth from "./pages/auth";
import Content from "./pages/content";
import useToken from "./components/useToken";

function App() {

    const { token, setToken } = useToken();

    if(!token) {
        return <Auth setToken={setToken} />
    }

    return (
        <RecoilRoot>
            <Header />
            <Content />
        </RecoilRoot>
    );
}

export default App;
