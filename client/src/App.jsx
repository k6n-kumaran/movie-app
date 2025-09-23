import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MovieDetail from './pages/MovieDetail'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import Favorites from './pages/Favorites'
import { Toaster } from 'react-hot-toast'

const App = () => {

  return (
    <div>
        <Toaster position="top-right" toastOptions={{
          style: {
            borderRadius: "12px",
          },
          }}/>
        <Router>
          <Routes> 
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='/movie/:id' element={<MovieDetail />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App