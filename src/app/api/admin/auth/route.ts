import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// This should be hashed in production
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$N9qo8uLOickgx2ZMRZoMye.nkIzJjO7yzH8ixdMQmdq6a6f9Mk/R.' // "admin123"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    // In development, allow simple password check
    if (process.env.NODE_ENV === 'development') {
      const devPassword = process.env.ADMIN_PASSWORD || 'LunaGems2024!'
      if (password === devPassword) {
        return NextResponse.json({ success: true })
      }
    } else {
      // In production, use hashed password
      const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
      if (isValid) {
        return NextResponse.json({ success: true })
      }
    }

    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
