import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QuizContextProvider } from './context/QuizContext.tsx'

createRoot(document.getElementById('root')!).render(
    <QuizContextProvider>
      <App />
    </QuizContextProvider>
)
