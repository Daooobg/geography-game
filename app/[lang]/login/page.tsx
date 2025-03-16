import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="container max-w-4xl mx-auto py-10 px-4 min-h-[70vh] flex items-center justify-center">
      <AuthForm mode="login" />
    </div>
  );
} 