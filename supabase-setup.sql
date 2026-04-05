-- Run this in Supabase SQL Editor to create tables

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin', 'instructor')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  instructor TEXT NOT NULL,
  instructor_image TEXT,
  thumbnail TEXT,
  duration TEXT,
  enrolled INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  category TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Modules table
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  "order" INTEGER NOT NULL
);

-- Lessons table
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'video' CHECK (type IN ('video', 'text', 'quiz')),
  duration INTEGER DEFAULT 0,
  content TEXT,
  "order" INTEGER NOT NULL
);

-- Enrollments table
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, course_id)
);

-- Lesson Progress table
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, lesson_id)
);

-- Quizzes table
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  questions INTEGER DEFAULT 0,
  duration INTEGER DEFAULT 30,
  passing_score INTEGER DEFAULT 70
);

-- Quiz Attempts table
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  score INTEGER DEFAULT 0,
  passed BOOLEAN DEFAULT false,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies (allow read access to all, write only for authenticated users)
CREATE POLICY "Allow read access" ON users FOR SELECT USING (true);
CREATE POLICY "Allow read access" ON courses FOR SELECT USING (true);
CREATE POLICY "Allow read access" ON modules FOR SELECT USING (true);
CREATE POLICY "Allow read access" ON lessons FOR SELECT USING (true);
CREATE POLICY "Allow read access" ON enrollments FOR SELECT USING (true);
CREATE POLICY "Allow read access" ON lesson_progress FOR SELECT USING (true);
CREATE POLICY "Allow read access" ON quizzes FOR SELECT USING (true);
CREATE POLICY "Allow read access" ON quiz_attempts FOR SELECT USING (true);

-- Insert sample data
INSERT INTO users (email, name, role) VALUES
  ('admin@ibi.edu', 'Admin User', 'admin'),
  ('sarah.mitchell@email.com', 'Sarah Mitchell', 'student'),
  ('john.doe@email.com', 'John Doe', 'student');

INSERT INTO courses (title, description, instructor, thumbnail, duration, enrolled, rating, category, price, featured) VALUES
  ('Foundations of Intimacy with God', 'Discover the depths of Gods love through this foundational course.', 'Dr. Sarah Mitchell', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', '12 hours', 1247, 4.8, 'Spiritual Formation', 199, true),
  ('The Prophetic Anointing', 'Learn to hear Gods voice and operate in the prophetic.', 'Pastor Michael Johnson', 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800', '8 hours', 892, 4.9, 'Ministry Training', 149, true),
  ('Kingdom Economics', 'Understand Gods principles for financial blessing.', 'Bishop Thomas', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800', '6 hours', 654, 4.7, 'Leadership', 99, false);
