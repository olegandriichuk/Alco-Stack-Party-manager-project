     import MenuButtonList from './components/MenuButtonList/MenuButtonList';
     import { faUser, faUsers, faCake, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
     import Logo from './assets/logo.svg';
     import Disco from './assets/disco.svg';
     import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

    //
    //
    // function App() {
    //     const menuButtons = [
    //         { text: 'Profile', icon: faUser, color: '#1dd958' },
    //         { text: 'Join', icon: faCake, color: '#5b7ff0' },
    //         { text: 'Create', icon: faUsers, color: '#ce5659' },
    //     ];
    // return (
    //     <div className="App">
    //         <MenuButtonList menuButtons={menuButtons}/>
    //     </div>
    // );
    // }
    //
    // export default App;
    // src/App.tsx
    import React from 'react';
    import PartyButtonList from './components/PartyButtonList/PartyButtonList';

    const App: React.FC = () => {
        const parties = [
            { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#708ff0' as const },
            { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#cf6165' as const },
            { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#708ff0' as const },
            { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#cf6165' as const },
            { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#708ff0' as const },
            { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#cf6165' as const },
            { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#708ff0' as const },
            { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#cf6165' as const },
            { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#708ff0' as const },
            { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#cf6165' as const },
            { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#708ff0' as const },
            { title: 'Name of party', description: 'Description bla bla blabla bla', date: 'xx.xx.xxxx', type: '#cf6165' as const }
        ];

        const menuButtons = [
            { text: 'Profile', icon: faUser, color: '#1dd958' },
            { text: 'Join', icon: faCake, color: '#5b7ff0' },
            { text: 'Create', icon: faUsers, color: '#ce5659' },
        ];

        const AppStyle: React.CSSProperties = {
            background: 'linear-gradient(to top, #333333, #d3d3d3)',
        };

        return (
            <div className="container-fluid p-0 d-flex flex-column align-items-center" style={AppStyle}>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div>
                        <img
                            src={Disco} // Adjust the path to your party icon
                            alt="Party Icon"
                            width="80"
                            height="80"
                        />
                    </div>
                    <div className={"p-2"}>
                        <FontAwesomeIcon icon={faCircleInfo} size="2x"/>
                    </div>
                </div>
                <img
                    src={Logo}
                    alt="Logo"
                    width="200"
                    height="80"
                    style={{margin: '1rem'}}
                />
                <h1>Your party, your rules!</h1>
                <h4>Your unforgettable night!</h4>
                <MenuButtonList menuButtons={menuButtons}/>
                <PartyButtonList parties={parties}/>
            </div>
        );
    };

     export default App;

