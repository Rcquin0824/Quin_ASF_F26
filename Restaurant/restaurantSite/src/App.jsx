import {useState} from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import {BrowserRouter as Router} from "react-router-dom"

const App = () => {
    return (
        <div className="App">
            <div className="container">
                <ul>
                    <li><Link to="pages/home.jsx">home</Link></li>
                    <li><Link to="pages/menu.jsx">menu</Link></li>
                    <li><Link to="pages/about.jsx">about</Link></li>
                    <li><Link to="pages/ReservationsPage.jsx">reservation</Link></li>
                </ul>
                <hr/>
                <Router>
                    <Route path="pages/home.jsx" element={<home/>}/>
                    <Route path="pages/about.jsx" element={<about/>}/>
                    <Route path="pages/ReservationsPage.jsx" element={<reservation/>}/>
                </Router>
            </div>
        </div>

    )
}

export default App
