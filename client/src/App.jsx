import "./styles.css";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import Logout from "./components/Logout";

export default function App() {
  return (
    <div>
      <h1>Plataforma de Gestión de Oportunidades de Inversión</h1>
      <div>
        <RegistrationForm />
        <LoginForm />
        <Logout />
        <Profile />
      </div>
    </div>
  );
}
