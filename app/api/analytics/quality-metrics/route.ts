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
      { name: "Code Clarity", value: 87, category: "Readability" },
      { name: "Documentation", value: 72, category: "Readability" },
      { name: "Test Coverage", value: 65, category: "Testing" },
      { name: "Error Handling", value: 78, category: "Robustness" },
      { name: "Performance", value: 82, category: "Efficiency" },
      { name: "Security", value: 91, category: "Security" },
      { name: "Best Practices", value: 84, category: "Standards" },
    ]

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error("Error fetching quality metrics:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

