import AuthForm from "@/components/auth-form"

export default function LoginPage() {
  return (
    <div className="min-h-[100svh] w-full bg-[#f0f1f2]">
      <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-4">
        <AuthForm />
        <p className="mt-6 text-center text-xs text-[#6c8391]">
          By continuing, you agree to our Terms & Privacy.
        </p>
      </div>
    </div>
  )
}
