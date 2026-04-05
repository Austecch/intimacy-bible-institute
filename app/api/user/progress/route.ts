import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("enrollments")
    .select(`
      *,
      course:courses(*),
      user:users(*)
    `)
    .order("enrolled_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, course_id, lesson_id, completed } = body;

    if (lesson_id && user_id) {
      const { data, error } = await supabase
        .from("lesson_progress")
        .upsert(
          {
            user_id,
            lesson_id,
            completed,
            completed_at: completed ? new Date().toISOString() : null,
          },
          { onConflict: "user_id, lesson_id" }
        )
        .select();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, data });
    }

    if (course_id && user_id) {
      const { data, error } = await supabase
        .from("enrollments")
        .upsert(
          {
            user_id,
            course_id,
            enrolled_at: new Date().toISOString(),
          },
          { onConflict: "user_id, course_id" }
        )
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json(
      { error: "user_id and course_id or lesson_id required" },
      { status: 400 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
