# GitMate - AI-Powered Code Reviews

GitMate is an AI-powered GitHub bot that reviews pull requests with helpful, constructive feedback. It analyzes your code changes and provides insights to help improve code quality, catch potential issues, and ensure best practices are followed.

## Features

- **AI-Powered Code Reviews**: Get detailed, helpful feedback on your pull requests using advanced AI models
- **Multiple AI Providers**: Use Google Gemini (free tier) or OpenAI (paid)
- **Customizable Tone**: Choose between different reviewer personalities to match your team's style
- **GitHub Integration**: Seamlessly integrates with your GitHub workflow and repositories
- **Auto-Generated Commit Messages**: Get AI-suggested commit messages based on your code changes
- **Team Performance Tracking**: Monitor code quality trends and improvements across your repositories

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A GitHub account
- A Google Gemini API key (free) or OpenAI API key (paid)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# GitHub Authentication
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GITHUB_TOKEN=your_github_personal_access_token

# AI API Keys (at least one is required)
GOOGLE_API_KEY=your_google_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
DEFAULT_AI_PROVIDER=gemini  # or "openai"

# Next.js and Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_string
```
