"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await register(name, email, password, passwordConfirmation);
      setAuth(res.data.user, res.data.token);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-container px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-md">
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

        <div className="rounded-xl bg-surface-white p-6 shadow-card">
          <h1 className="text-h3 font-heading text-text-primary text-center">Create Your Account</h1>
          <p className="mt-1 text-center text-sm text-text-secondary">Join as a freelance accountant</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />

            {error && (
              <div className="rounded-lg bg-brand-red/5 border border-brand-red/20 p-3 text-sm text-brand-red">
                {error}
              </div>
            )}

            <Button variant="accent" className="w-full" type="submit" loading={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-brand-jade hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
