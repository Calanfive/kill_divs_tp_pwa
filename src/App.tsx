import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Accueil from './routes/Accueil'
import Jeu from './routes/Jeu'
import Resultat from './routes/Resultat';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
  },
  {
    path: "/jeu",
    element: <Jeu />,
  },
  {
    path: "/resultat/:initialtime",
    element: <Resultat />
  }
]);

function App() {

  return <RouterProvider router={router} />
}

export default App
