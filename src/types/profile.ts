export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  linkedin_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Resume {
  id: string;
  user_id: string;
  content: string | null;
  file_url: string | null;
  link_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobDescription {
  id: string;
  user_id: string;
  content: string | null;
  company_name: string | null;
  role: string | null;
  file_url: string | null;
  link_url: string | null;
  created_at: string;
  updated_at: string;
}