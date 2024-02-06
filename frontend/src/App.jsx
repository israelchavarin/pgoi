import "./styles.css";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";

export default function App() {
  return (
    <div>
      <h1>Plataforma de Gestion de Oportunidades de Inversión</h1>
      <div>
        <RegistrationForm />
        <LoginForm />
      </div>
    </div>
  );
}
