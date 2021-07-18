import Header from "./components/Header";
import {RecoilRoot} from "recoil";
import Auth from "./pages/auth";
import Content from "./pages/content";
import useToken from "./components/useToken";
import DisplayProjectName from "./components/DisplayProjectName";
import SockJsClient from 'react-stomp';


function App() {

    const { token, setToken } = useToken();

    if(!token) {
        return <Auth setToken={setToken} />
    }

    let SOCKET_URL = 'http://localhost:8080/snippets';

    function onMessageReceived(msg) {
        //Cette fonction est appellé a chaque fois qu'il y a un changement sur les snippets du projet associé
        console.log(msg);
    }

    return (
        <RecoilRoot>
            <DisplayProjectName />
            <Header setToken={setToken} />
            <Content />
            <div>
                <SockJsClient
                    url={SOCKET_URL}
                    topics={['/listener/projects/3']} // Dans l'url il faut mettre l'id du projet
                    onConnect={console.log("Connected!")} // Pas vraiment utile
                    onDisconnect={console.log("Disconnected!")}// Pas vraiment utile 
                    onMessage={msg => onMessageReceived(msg)}
                    debug={false}
                />
            </div>
        </RecoilRoot>

    );
}

export default App;
