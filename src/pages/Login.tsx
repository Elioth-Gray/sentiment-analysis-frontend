import { DescriptionLogin } from '@/components/Login/Description';
import LoginForm from '@/components/Login/Form';

const Login = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 flex">
      <DescriptionLogin />

      <LoginForm />
    </div>
  );
};

export default Login;
