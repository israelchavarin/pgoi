import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

export default function HomePage() {
  return (
    <div>
      <h1 className='text-4xl font-bold'>
        Plataforma de Gestion de Oportunidades de Inversión
      </h1>
      <div>
        <LoginForm />
        <RegistrationForm />
      </div>
    </div>
  );
}
