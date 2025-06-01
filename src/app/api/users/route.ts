import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

// Ensure the data directory exists
async function ensureDbExists() {
  try {
    await fs.access(path.join(process.cwd(), 'data'));
  } catch {
    await fs.mkdir(path.join(process.cwd(), 'data'));
  }
  
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify([]));
  }
}

// Get all users
export async function GET() {
  await ensureDbExists();
  const users = await fs.readFile(DB_PATH, 'utf-8');
  return NextResponse.json(JSON.parse(users));
}

// Register new user
export async function POST(request: NextRequest) {
  try {
    await ensureDbExists();
    const { email, password, username } = await request.json();

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Email, password and username are required' },
        { status: 400 }
      );
    }

    const users = JSON.parse(await fs.readFile(DB_PATH, 'utf-8'));
    
    // Check if user already exists
    if (users.some((user: any) => user.email === email)) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Add new user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password, // In a real app, this should be hashed
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));

    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
} 