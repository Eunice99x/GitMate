import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function GET(request: Request) {
  try {
    // Verify authentication
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real implementation, this would fetch data from a database
    // For now, we'll generate mock data
    const today = new Date()
    const data = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() - (29 - i))
      return {
        date: date.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 10) + 1, // Random number between 1-10
      }
    })

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error("Error fetching review history:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

