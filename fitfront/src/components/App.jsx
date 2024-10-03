import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Login } from './Login';
import {Exercises} from './Exercises'
export function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/exercises' element={<Exercises />} />
                <Route path='*' element={<Login />} />
            </Routes>
        </Router>
    );
}

