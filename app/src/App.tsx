    import React from 'react';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { Outlet } from 'react-router-dom';
    import {UserProvider} from "./Context/useAuth.tsx";
    import { ToastContainer } from "react-toastify";


    const App: React.FC = () => {
        // const AppStyle: React.CSSProperties = {
        //     background: 'linear-gradient(to top, #333333, #d3d3d3)',
        //     minHeight: '100vh',
        // };
        return (
            <>
                <UserProvider>
                    <Outlet />
                    <ToastContainer />
                </UserProvider>
            </>
        );
    };


    export default App;

