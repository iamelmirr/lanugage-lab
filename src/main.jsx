import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/home.css'
import App from './App.jsx'
import React from "react"
// import dotenv from 'dotenv';
// dotenv.config()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
