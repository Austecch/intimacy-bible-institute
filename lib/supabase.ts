import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xavltofbdixecsoxzrcj.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhhdmx0b2ZiZGl4ZWNzb3h6cmNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzODU4OTIsImV4cCI6MjA5MDk2MTg5Mn0.FFqRkkykD8Rs9w5AHOff_ANEBZVFexAqD2cwQWoVY38";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: "student" | "admin" | "instructor";
          avatar_url?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role?: "student" | "admin" | "instructor";
          avatar_url?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: "student" | "admin" | "instructor";
          avatar_url?: string;
          created_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          instructor: string;
          instructor_image?: string;
          thumbnail: string;
          duration: string;
          enrolled: number;
          rating: number;
          category: string;
          price: number;
          featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          instructor: string;
          instructor_image?: string;
          thumbnail: string;
          duration: string;
          enrolled?: number;
          rating?: number;
          category: string;
          price?: number;
          featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          instructor?: string;
          instructor_image?: string;
          thumbnail?: string;
          duration?: string;
          enrolled?: number;
          rating?: number;
          category?: string;
          price?: number;
          featured?: boolean;
          created_at?: string;
        };
      };
      modules: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          order: number;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          order: number;
        };
        Update: {
          id?: string;
          course_id?: string;
          title?: string;
          order?: number;
        };
      };
      lessons: {
        Row: {
          id: string;
          module_id: string;
          title: string;
          type: "video" | "text" | "quiz";
          duration: number;
          content?: string;
          order: number;
        };
        Insert: {
          id?: string;
          module_id: string;
          title: string;
          type: "video" | "text" | "quiz";
          duration: number;
          content?: string;
          order: number;
        };
        Update: {
          id?: string;
          module_id?: string;
          title?: string;
          type?: "video" | "text" | "quiz";
          duration?: number;
          content?: string;
          order?: number;
        };
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          progress: number;
          enrolled_at: string;
          completed_at?: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          progress?: number;
          enrolled_at?: string;
          completed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          progress?: number;
          enrolled_at?: string;
          completed_at?: string;
        };
      };
      lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          completed: boolean;
          completed_at?: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          completed?: boolean;
          completed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          completed?: boolean;
          completed_at?: string;
        };
      };
      quizzes: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          questions: number;
          duration: number;
          passing_score: number;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          questions: number;
          duration: number;
          passing_score: number;
        };
        Update: {
          id?: string;
          course_id?: string;
          title?: string;
          questions?: number;
          duration?: number;
          passing_score?: number;
        };
      };
      quiz_attempts: {
        Row: {
          id: string;
          user_id: string;
          quiz_id: string;
          score: number;
          passed: boolean;
          attempted_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          quiz_id: string;
          score: number;
          passed: boolean;
          attempted_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          quiz_id?: string;
          score?: number;
          passed?: boolean;
          attempted_at?: string;
        };
      };
    };
  };
};
