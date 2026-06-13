export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface JobListItem {
  id: number;
  title: string;
  client_name: string;
  short_description: string;
  budget_min: number;
  budget_max: number;
  deadline: string;
  category: { id: number; name: string };
  bids_count: number;
  posted_at: string;
  status: "open" | "closed";
}

export interface JobDetail extends JobListItem {
  description: string;
  required_skills: string[];
  delivery_time: string;
  attachments: string[] | null;
  has_applied: boolean;
  user_bid: Bid | null;
}

export interface Bid {
  id: number;
  proposed_price: number;
  estimated_delivery_time: string;
  cover_letter: string;
  experience_summary: string;
  created_at: string;
  job?: {
    id: number;
    title: string;
    status: "open" | "closed";
    client_name: string;
  };
  user?: {
    id: number;
    name: string;
  };
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
  errors?: Record<string, string[]>;
}
