import {NextResponse} from "next/server";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const body = await request.json();
    const {githubToken, openaiKey, googleKey, githubSecret, googleGenerativeAiApiKey, defaultAiProvider} = body;

    // Validate required fields
    if (!githubToken) {
      return NextResponse.json({error: "GitHub token is required"}, {status: 400});
    }

    // Return success - settings will be stored in localStorage on the client side
    return NextResponse.json({success: true});
  } catch (error: any) {
    console.error("Error saving settings:", error);
    return NextResponse.json({error: "Failed to save settings"}, {status: 500});
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    // Return empty settings object - actual settings will be loaded from localStorage on the client side
    return NextResponse.json({
      githubToken: null,
      openaiKey: null,
      googleKey: null,
      githubSecret: null,
      googleGenerativeAiApiKey: null,
      defaultAiProvider: "gemini"
    });
  } catch (error: any) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({error: "Failed to fetch settings"}, {status: 500});
  }
}
