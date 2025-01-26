import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store';
import history from './services/history';
import Route from './Routes/index';
import Header from './components/header';
import GlobalStyle from './styles/GlobalStyles';

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router history={history}>
                    <Header />
                    <Route />
                    <GlobalStyle />
                    <ToastContainer
                        autoClose={5000}
                        progressClassName="toastProgress"
                        bodyClassName="toastBody"
                        closeButton={false}
                    />
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
