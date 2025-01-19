/*
  # Create core application tables and policies

  1. New Tables
    - `profiles`: Store user profile information
    - `resumes`: Store user resumes
    - `job_descriptions`: Store job descriptions
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create tables if they don't exist
DO $$ 
BEGIN
  -- Create profiles table
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
    CREATE TABLE profiles (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
      full_name text,
      linkedin_url text,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now(),
      UNIQUE(user_id)
    );
  END IF;

  -- Create resumes table
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'resumes') THEN
    CREATE TABLE resumes (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
      content text,
      file_url text,
      link_url text,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
  END IF;

  -- Create job_descriptions table
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'job_descriptions') THEN
    CREATE TABLE job_descriptions (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
      content text,
      company_name text,
      role text,
      file_url text,
      link_url text,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Enable RLS
DO $$ 
BEGIN
  EXECUTE 'ALTER TABLE profiles ENABLE ROW LEVEL SECURITY';
  EXECUTE 'ALTER TABLE resumes ENABLE ROW LEVEL SECURITY';
  EXECUTE 'ALTER TABLE job_descriptions ENABLE ROW LEVEL SECURITY';
EXCEPTION 
  WHEN OTHERS THEN NULL;
END $$;

-- Create policies safely
DO $$ 
BEGIN
  -- Profiles policies
  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile') THEN
    CREATE POLICY "Users can view own profile" ON profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile') THEN
    CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile') THEN
    CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Resumes policies
  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'resumes' AND policyname = 'Users can view own resumes') THEN
    CREATE POLICY "Users can view own resumes" ON resumes FOR SELECT TO authenticated USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'resumes' AND policyname = 'Users can insert own resumes') THEN
    CREATE POLICY "Users can insert own resumes" ON resumes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'resumes' AND policyname = 'Users can update own resumes') THEN
    CREATE POLICY "Users can update own resumes" ON resumes FOR UPDATE TO authenticated USING (auth.uid() = user_id);
  END IF;

  -- Job descriptions policies
  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'job_descriptions' AND policyname = 'Users can view own job descriptions') THEN
    CREATE POLICY "Users can view own job descriptions" ON job_descriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'job_descriptions' AND policyname = 'Users can insert own job descriptions') THEN
    CREATE POLICY "Users can insert own job descriptions" ON job_descriptions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'job_descriptions' AND policyname = 'Users can update own job descriptions') THEN
    CREATE POLICY "Users can update own job descriptions" ON job_descriptions FOR UPDATE TO authenticated USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create or replace function for handling updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers safely
DO $$ 
BEGIN
  -- Drop existing triggers if they exist
  DROP TRIGGER IF EXISTS set_profiles_updated_at ON profiles;
  DROP TRIGGER IF EXISTS set_resumes_updated_at ON resumes;
  DROP TRIGGER IF EXISTS set_job_descriptions_updated_at ON job_descriptions;

  -- Create new triggers
  CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

  CREATE TRIGGER set_resumes_updated_at
    BEFORE UPDATE ON resumes
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

  CREATE TRIGGER set_job_descriptions_updated_at
    BEFORE UPDATE ON job_descriptions
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();
END $$;