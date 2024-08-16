    import React from 'react';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { Outlet } from 'react-router-dom';

    const App: React.FC = () => {
        const AppStyle: React.CSSProperties = {
            background: 'linear-gradient(to top, #333333, #d3d3d3)',
            minHeight: '100vh',
        };
        return (
            <div style={AppStyle}>
                {/* You can add a header, navigation, or other components here */}
                <Outlet /> {/* This will render the nested routes */}
                {/* You can also add a footer or other elements */}
            </div>
        );
    };


    export default App;

