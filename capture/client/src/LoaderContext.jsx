import React, { createContext, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Routers from './Routers';
import App from './App';

export let LoaderContext = createContext()

function Context(props) {
  const [darkMode, setDarkMode] = useState(true);
    const [loader, setloader] = useState(false);
    return (
        <>
            <LoaderContext.Provider value={{ loader: loader, setloader: setloader ,darkMode:darkMode , setDarkMode:setDarkMode}} >
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </LoaderContext.Provider>
        </>
    )
}

export default Context