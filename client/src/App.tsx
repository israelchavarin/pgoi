import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/profile' element={<h1>Profile</h1>} />
        <Route path='/deposit' element={<h1>Deposit</h1>} />
        <Route path='/orders' element={<h1>Orders</h1>} />
        <Route path='/opportunities' element={<h1>Opportunities</h1>} />
        <Route path='opportunities/:id' element={<h1>Opportunity</h1>} />
        <Route path='opportunities/:id/invest' element={<h1>Invest</h1>} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}
