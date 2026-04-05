import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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
