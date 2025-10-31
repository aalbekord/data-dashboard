import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './routes/Layout'
import DetailView from './components/DetailView'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
                <Route path="/details/:index" element={<DetailView />} />
            </Route>
        </Routes>
    </BrowserRouter>
)