
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllUser from './pages/pagination/AllUser';
import AddEditUser from './pages/add/AddEditUser';
import NotFound from './pages/notfound/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {



  return (
    <div className="container">
      <ToastContainer position='top-center' />
      <Router>
        <Routes>
          <Route path='/' element={<AllUser />} />
          <Route path='/add' element={<AddEditUser />} />
          <Route path='/edit/:id' element={<AddEditUser />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
