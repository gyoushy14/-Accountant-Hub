import type { ApiResponse, Bid, JobDetail, JobListItem, PricingTier, AccountantProfile, SuccessStoryItem, ResourceArticle, CareerPosition } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

async function getToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = await getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  const json = await res.json();

  if (!res.ok) {
    throw new ApiError(
      json.message || "Request failed",
      res.status,
      json.errors
    );
  }

  return json;
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

// Auth
export async function login(email: string, password: string) {
  return request<{ user: { id: number; name: string; email: string }; token: string }>(
    "/auth/login",
    { method: "POST", body: JSON.stringify({ email, password }) }
  );
}

export async function register(name: string, email: string, password: string, passwordConfirmation: string) {
  return request<{ user: { id: number; name: string; email: string }; token: string }>(
    "/auth/register",
    { method: "POST", body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }) }
  );
}

export async function logout() {
  return request<null>("/auth/logout", { method: "POST" });
}

export async function getMe() {
  return request<{ id: number; name: string; email: string }>("/auth/me");
}

// Categories
export async function getCategories() {
  return request<{ id: number; name: string; slug: string }[]>("/categories");
}

// Jobs
export async function getJobs(params?: Record<string, string>) {
  const searchParams = new URLSearchParams(params || {});
  const qs = searchParams.toString();
  return request<JobListItem[]>(`/jobs${qs ? `?${qs}` : ""}`);
}

export async function getJob(id: string) {
  return request<JobDetail>(`/jobs/${id}`);
}

// Bids
export async function submitBid(jobId: string, data: {
  proposed_price: number;
  estimated_delivery_time: string;
  cover_letter: string;
  experience_summary: string;
}) {
  return request<Bid>(`/jobs/${jobId}/bids`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getMyBids(page = 1) {
  return request<Bid[]>(`/my-bids?page=${page}`);
}

// Pricing
export async function getPricing() {
  return request<PricingTier[]>("/pricing");
}

// Accountants
export async function getTopAccountants() {
  return request<AccountantProfile[]>("/accountants/top");
}

// Success Stories
export async function getSuccessStories() {
  return request<SuccessStoryItem[]>("/success-stories");
}

// Resources
export async function getResources() {
  return request<ResourceArticle[]>("/resources");
}

// Careers
export async function getCareers() {
  return request<CareerPosition[]>("/careers");
}

// Contact
export async function submitContact(data: { name: string; email: string; subject: string; message: string }) {
  return request<null>("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
