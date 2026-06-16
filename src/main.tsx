import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// Register the CSS Houdini Paint Worklet asset safely on the browser window object
if ('paintWorklet' in CSS) {
  (CSS as any).paintWorklet.addModule('/circuit-worklet.js')
    .then(() => console.log('⚡ CSS Houdini Circuit Engine: Online'))
    .catch((err: any) => console.warn('Houdini Paint Worklet blocked or unsupported:', err));
}