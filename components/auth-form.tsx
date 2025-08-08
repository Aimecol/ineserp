"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
})

type FormValues = z.infer<typeof schema>

export default function AuthForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: false },
  })

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 900))
      if (values.email === "admin@example.com" && values.password === "password") {
        toast({
          title: "Welcome back!",
          description: "You have logged in successfully.",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password.",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto w-full max-w-md rounded-xl border bg-white p-6 shadow-md"
      aria-label="Login form"
    >
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-black">Sign in</h1>
        <p className="text-sm text-[#6c8391]">Access your account</p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="rounded-md"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="rounded-md"
            {...register("password")}
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="text-sm text-red-600" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="remember" {...register("remember")} />
            <span>Remember me</span>
          </label>
          <button type="button" className="text-sm text-[#32872e] hover:underline">
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="h-10 w-full rounded-md bg-[#32872e] text-white hover:bg-[#e0d722] hover:text-black"
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Hint: admin@example.com / password
        </p>
      </div>
    </motion.form>
  )
}
