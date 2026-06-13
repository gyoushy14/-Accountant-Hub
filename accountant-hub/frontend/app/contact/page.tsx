"use client";

import { useState } from "react";
import { submitContact } from "@/lib/api";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await submitContact({ name, email, subject, message });
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-24 text-center">
          <h1 className="text-h1 text-white font-heading">Contact Us</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Have a question or need help? We are here for you. Send us a message and we will get back to you shortly.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Form */}
          <div>
            {success ? (
              <div className="rounded-xl bg-surface-white p-8 shadow-card text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-jade/10">
                  <svg className="h-8 w-8 text-brand-jade" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-text-primary">Message Sent!</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-xl bg-surface-white p-6 shadow-card space-y-4">
                <h2 className="text-h3 font-heading text-text-primary">Send a Message</h2>

                <Input label="Your Name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input label="Email Address" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input label="Subject" placeholder="How can we help?" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                <Textarea label="Message" placeholder="Tell us more about your inquiry..." value={message} onChange={(e) => setMessage(e.target.value)} required />

                {error && (
                  <div className="rounded-lg bg-brand-red/5 border border-brand-red/20 p-3 text-sm text-brand-red">
                    {error}
                  </div>
                )}

                <Button variant="accent" type="submit" loading={submitting} className="w-full">
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>

          {/* Company Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-jade/10 text-brand-jade">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-text-primary">Email</p>
                  <p className="text-sm text-text-secondary">hello@accounthub.com</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-jade/10 text-brand-jade">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-text-primary">Phone</p>
                  <p className="text-sm text-text-secondary">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-jade/10 text-brand-jade">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-text-primary">Address</p>
                  <p className="text-sm text-text-secondary">123 Finance Street, Suite 400<br />San Francisco, CA 94102</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
