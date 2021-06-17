import React from 'react';
import { default as configureStore } from './configure-store';
import { Provider } from 'react-redux';
import HomePage from './containers/home/home.jsx';

function App() {
    return (
        <Provider store={configureStore.store}>
            <div className="row m-0 main-app-container">
                <HomePage></HomePage>
            </div>
        </Provider>
    );
}
export default App;