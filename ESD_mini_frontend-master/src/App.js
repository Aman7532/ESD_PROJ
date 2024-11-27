import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import StudentRegistration from './components/StudentRegistration';
import ProtectedRoute from './components/protectedRoute';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        {/* <Route path="/register" element={<StudentRegistration />} /> */}
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <StudentRegistration />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;