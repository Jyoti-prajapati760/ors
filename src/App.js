
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Dashboard from './project/Dashboard';
import Home from './project/Home';
import AddUser from './project/AddUser';
import UserList from './project/UserList';
import AddCollege from './project/AddCollege';
import CollegeList from './project/CollegeList';
import AddStudent from './project/AddStudent';
import StudentList from './project/StudentList'
import AddMarksheet from './project/AddMarksheet';
import MarksheetList from './project/MarksheetList';
import AddRole from './project/AddRole';
import RoleList from './project/RoleList';
import Login from './project/Login';
import Registration from './project/Registration';

function App() {
  return (
    <BrowserRouter>
    <Dashboard/>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/AddUser/:id" element={<AddUser />} />

        <Route path="/UserList" element={<UserList />} />
        
        <Route path="/AddCollege" element={<AddCollege />} />
        <Route path="/AddCollege/:id" element={<AddCollege/>} />

        <Route path="/CollegeList" element={<CollegeList />} />


        <Route path="/AddStudent" element={<AddStudent />} />
        <Route path="/AddStudent/:id" element={<AddStudent />} />

        <Route path="/StudentList" element={<StudentList />} />

        <Route path="/AddMarksheet" element={<AddMarksheet />} />
        <Route path="/AddMarksheet/:id" element={<AddMarksheet />} />

        <Route path="/MarksheetList" element={<MarksheetList />} />

        <Route path="/AddRole" element={<AddRole />} />
        <Route path="/AddRole/:id" element={<AddRole />} />

        <Route path="/RoleList" element={<RoleList />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
