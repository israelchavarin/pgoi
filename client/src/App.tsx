import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import HomePage from "./pages/HomePage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<h1>Profile</h1>} />
            <Route path='/deposit' element={<h1>Deposit</h1>} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/opportunities' element={<OpportunitiesPage />} />
            <Route path='/opportunities/:id' element={<OpportunitiesPage />} />
            <Route
              path='/opportunities/:id/invest'
              element={<OpportunitiesPage />}
            />
          </Route>

          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
