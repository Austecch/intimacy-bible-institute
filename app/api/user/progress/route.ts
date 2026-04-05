import { NextResponse } from "next/server";
import { currentUser } from "@/lib/data";

export async function GET() {
  return NextResponse.json(currentUser);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courseId, lessonId, completed } = body;
    
    if (!courseId || !lessonId) {
      return NextResponse.json(
        { error: "courseId and lessonId are required" },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      courseId,
      lessonId,
      completed,
      message: "Progress saved",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
