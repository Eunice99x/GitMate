import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import {encrypt, decrypt} from "@/lib/encryption";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const body = await request.json();
    const {githubToken, openaiKey, googleKey} = body;

    // Validate required fields
    if (!githubToken) {
      return NextResponse.json({error: "GitHub token is required"}, {status: 400});
    }

    // Encrypt sensitive data
    const encryptedGithubToken = encrypt(githubToken);
    const encryptedOpenaiKey = openaiKey ? encrypt(openaiKey) : null;
    const encryptedGoogleKey = googleKey ? encrypt(googleKey) : null;

    // Update user settings
    await prisma.user.update({
      where: {id: session.user.id},
      data: {
        githubToken: encryptedGithubToken,
        openaiKey: encryptedOpenaiKey,
        googleKey: encryptedGoogleKey
      }
    });

    return NextResponse.json({success: true});
  } catch (error: any) {
    console.error("Error saving settings:", error);
    return NextResponse.json({error: "Failed to save settings"}, {status: 500});
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const user = await prisma.user.findUnique({
      where: {id: session.user.id},
      select: {
        githubToken: true,
        openaiKey: true,
        googleKey: true
      }
    });

    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }

    // Decrypt sensitive data
    const settings = {
      githubToken: user.githubToken ? decrypt(user.githubToken) : null,
      openaiKey: user.openaiKey ? decrypt(user.openaiKey) : null,
      googleKey: user.googleKey ? decrypt(user.googleKey) : null
    };

    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({error: "Failed to fetch settings"}, {status: 500});
  }
}
