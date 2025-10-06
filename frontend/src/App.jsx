import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import NavBar from './components/ui/navBar';
import SignUp from './pages/signUp';



const App = ()=>{
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();

  return(
    <div>
      {authUser && 
      <NavBar/>
      }


      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/" />} />
        <Route path='/Signup' element={!authUser?<SignUp/>:<Navigate to="/login" /> } />
      </Routes> 
      <Toaster />
     
    </div>
    
    
    
  )
}

export default App
