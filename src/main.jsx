import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from './routes/Layout'
import DetailView from './routes/DetailView'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
                <Route path="/coinDetails/:symbol" element={<DetailView />} />
            </Route>
        </Routes>
    </BrowserRouter>
)