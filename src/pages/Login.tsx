import { LoginCard } from "@/components/ui/login-card";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-jd-gray-light via-background to-jd-green/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;