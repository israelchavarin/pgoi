import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<h1>Profile</h1>} />
        <Route path='/opportunities' element={<h1>Home Page</h1>} />
        <Route
          path='/opportunities/:opportunity_id'
          element={<h1>Home Page</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}
