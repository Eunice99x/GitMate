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
    const data = [
      {
        id: "user1",
        name: "Alex Johnson",
        username: "alexj",
        avatarUrl: "https://github.com/identicons/alexj.png",
        reviewCount: 42,
        approvalRate: 87,
        qualityScore: 92,
        rank: 1,
      },
      {
        id: "user2",
        name: "Sam Taylor",
        username: "samt",
        avatarUrl: "https://github.com/identicons/samt.png",
        reviewCount: 38,
        approvalRate: 82,
        qualityScore: 88,
        rank: 2,
      },
      {
        id: "user3",
        name: "Jordan Lee",
        username: "jlee",
        avatarUrl: "https://github.com/identicons/jlee.png",
        reviewCount: 35,
        approvalRate: 79,
        qualityScore: 85,
        rank: 3,
      },
      {
        id: "user4",
        name: "Casey Morgan",
        username: "cmorgan",
        avatarUrl: "https://github.com/identicons/cmorgan.png",
        reviewCount: 29,
        approvalRate: 75,
        qualityScore: 81,
        rank: 4,
      },
      {
        id: "user5",
        name: "Riley Smith",
        username: "rsmith",
        avatarUrl: "https://github.com/identicons/rsmith.png",
        reviewCount: 24,
        approvalRate: 71,
        qualityScore: 78,
        rank: 5,
      },
    ]

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error("Error fetching team leaderboard:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

