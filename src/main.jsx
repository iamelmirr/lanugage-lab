window.global = window;
window.process = {
    env: { DEBUG: undefined },
}
import { Buffer } from 'buffer'
window.Buffer = Buffer
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/styles.css'
import App from './App.jsx'
import React from "react"

createRoot(document.getElementById('root')).render(
  
    <App />
  
)
