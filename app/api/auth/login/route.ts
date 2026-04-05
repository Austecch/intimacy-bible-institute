import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const mockUsers = [
      { email: "sarah.mitchell@email.com", password: "password123", role: "student", name: "Sarah Mitchell" },
      { email: "admin@ibi.edu", password: "admin123", role: "admin", name: "Admin User" },
    ];

    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: { email: user.email, name: user.name, role: user.role },
    });

    response.cookies.set("auth_token", "mock_token_" + Date.now(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    response.cookies.set("user_role", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return NextResponse.json({
    methods: ["POST"],
  });
}
