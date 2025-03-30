# GitMate Installation Guide

This guide will walk you through the process of installing and configuring GitMate for your GitHub repositories.

## Prerequisites

Before installing GitMate, ensure you have:

- A GitHub account with admin access to repositories
- Node.js 18+ and npm (for self-hosted installation)
- API keys for at least one AI provider (Google Gemini or OpenAI)

## Installation Options

GitMate can be installed in two ways:

1. **GitHub App Installation**: The easiest way to get started
2. **Self-Hosted Installation**: For more control and customization

## GitHub App Installation

### Step 1: Install the GitHub App

1. Visit the [GitMate GitHub App](https://github.com/apps/gitmate) page
2. Click "Install"
3. Select the repositories you want GitMate to have access to
4. Complete the authorization process

### Step 2: Configure Settings

After installation, you'll be redirected to the GitMate dashboard where you can:

1. Configure your default review tone
2. Set up your AI provider preferences
3. Customize notification settings

### Step 3: Create a Pull Request

GitMate will automatically review new pull requests in the repositories where it's installed.

## Self-Hosted Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/gitmate/gitmate.git
cd gitmate

