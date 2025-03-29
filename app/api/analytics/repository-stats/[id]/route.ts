import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const repositoryId = Number.parseInt(params.id)
    if (isNaN(repositoryId)) {
      return NextResponse.json({ error: "Invalid repository ID" }, { status: 400 })
    }

    // In a real implementation, this would fetch data from a database for the specific repository
    // For now, we'll generate mock data
    const data = {
      id: repositoryId,
      name: `Repository ${repositoryId}`,
      totalPRs: Math.floor(Math.random() * 100) + 20,
      approvedPRs: Math.floor(Math.random() * 70) + 10,
      rejectedPRs: Math.floor(Math.random() * 15) + 2,
      pendingPRs: Math.floor(Math.random() * 20) + 5,
      averageReviewTime: Math.floor(Math.random() * 120) + 30, // in minutes
      qualityScore: Math.floor(Math.random() * 30) + 70, // 70-100
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error(`Error fetching repository stats for ID ${params.id}:`, error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

