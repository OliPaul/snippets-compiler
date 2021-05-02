import Header from "./components/Header";
import {RecoilRoot} from "recoil";
import Content from "./pages/content";

function App() {
    return (
        <RecoilRoot>
            <Header />
            <Content />
        </RecoilRoot>
    );
}

export default App;
