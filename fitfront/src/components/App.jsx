import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Login } from './Login';
import {Exercises} from './Exercises'
import { Routines } from './Routines';
import { Meals } from './Meals';
export function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/exercises' element={<Exercises />} />
                <Route path='/routines' element={<Routines />} />
                <Route path='/meals' element={<Meals />} />
                <Route path='*' element={<Login />} />
            </Routes>
        </Router>
    );
}

