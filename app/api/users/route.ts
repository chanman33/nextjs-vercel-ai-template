import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/utils/actions/user-service';

export async function GET() {
  const users = await UserService.getAll();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();
    
    // Validate required fields
    if (!userData.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    const newUser = await UserService.create(userData);
    
    if (!newUser) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
} 