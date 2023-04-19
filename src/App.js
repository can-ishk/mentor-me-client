import { CssBaseline, ThemeProvider } from '@mui/material';
import Test from './pages/Test';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import theme from './theme'

import Explore from './pages/Explore';
import Ment from './pages/Ment';
import CreateMent from './pages/CreateMent';
import Search from './pages/Search';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import LogIn from './pages/LogIn';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline/>
        <Routes>
          <Route path="/test" element={<Test/>} />
          <Route path="/" element={<Explore />} />
          <Route path="/ments/:id" element={<Ment />} />
          <Route
            path="/ments/create"
            element={
              <PrivateRoute>
                <CreateMent/>
              </PrivateRoute>
            }
          />
          <Route path="/search" element={<Search />} />
          <Route path="/users/:id" element={<Profile/>} />
          <Route path="/logIn" element={<LogIn/>} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      
      
    </ThemeProvider>
  );
}

export default App;
