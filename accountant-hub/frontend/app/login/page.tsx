"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/Button";
import Input from "@/components/Input";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(email, password);
      setAuth(res.data.user, res.data.token);
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-xl bg-surface-white p-6 shadow-card">
        <h1 className="text-h3 font-heading text-text-primary text-center">Welcome Back</h1>
        <p className="mt-1 text-center text-sm text-text-secondary">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="rounded-lg bg-brand-red/5 border border-brand-red/20 p-3 text-sm text-brand-red">
              {error}
            </div>
          )}

          <Button variant="accent" className="w-full" type="submit" loading={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-brand-jade hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-container px-4 py-16 lg:py-24">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-white text-lg font-bold">
            A
          </div>
          <span className="text-xl font-bold text-brand-navy font-heading">
            Accountant<span className="text-brand-jade">HUB</span>
          </span>
        </div>
      </div>

      <Suspense fallback={<div className="mx-auto max-w-md h-96 animate-pulse rounded-xl bg-gray-200" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
