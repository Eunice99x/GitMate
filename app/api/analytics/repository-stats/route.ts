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
    // For now, we'll generate mock data for overall repository stats
    const data = {
      id: 0, // 0 indicates overall stats
      name: "All Repositories",
      totalPRs: 156,
      approvedPRs: 112,
      rejectedPRs: 18,
      pendingPRs: 26,
      averageReviewTime: 87, // in minutes
      qualityScore: 84,
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error("Error fetching repository stats:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

