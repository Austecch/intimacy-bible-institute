import { NextResponse } from "next/server";
import { courses } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  
  let result = courses;
  
  if (id) {
    const course = courses.find(c => c.id === id);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json(course);
  }
  
  if (category) {
    result = result.filter(c => c.category.toLowerCase() === category.toLowerCase());
  }
  
  if (featured === "true") {
    result = result.filter(c => c.featured);
  }
  
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newCourse = {
      id: "course_" + Date.now(),
      ...body,
      enrolled: 0,
      rating: 0,
      modules: [],
    };
    
    return NextResponse.json(newCourse, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
