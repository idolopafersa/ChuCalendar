import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Login } from './Login';

export function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </Router>
    );
}

