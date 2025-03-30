# GitMate Troubleshooting Guide

This guide helps you diagnose and resolve common issues with GitMate.

## Authentication Issues

### Problem: Unable to sign in with GitHub

**Possible causes:**
- GitHub OAuth app configuration is incorrect
- Missing or invalid environment variables

**Solutions:**
1. Verify that `GITHUB_ID` and `GITHUB_SECRET` are correctly set in your environment variables
2. Check that your OAuth app's callback URL is correctly configured
3. Ensure your GitHub account has the necessary permissions

### Problem: "Invalid token" or "Token expired" errors

**Solutions:**
1. Sign out and sign back in to refresh your token
2. Check that your GitHub token has the required scopes (repo, read:user, user:email)

## Review Generation Issues

### Problem: Reviews are not being generated

**Possible causes:**
- Missing or invalid AI provider API keys
- Pull request is too large
- Timeout during review generation

**Solutions:**
1. Verify that at least one AI provider API key is correctly set
2. Check the server logs for specific error messages
3. For large pull requests, try reducing the diff size or increasing timeouts
4. Try switching to a different AI provider

### Problem: "Error generating review" message

**Solutions:**
1. Check that your AI provider API key is valid and has sufficient quota
2. Verify that the AI model specified is available with your current plan
3. Try the fallback provider if configured

## GitHub Integration Issues

### Problem: GitMate can't access repositories

**Solutions:**
1. Ensure GitMate has been installed on the repositories you want to analyze
2. Check that your GitHub token has the necessary permissions
3. Verify that the repository exists and you have access to it

### Problem: Webhooks not triggering automatic reviews

**Solutions:**
1. Check that webhooks are correctly configured in your GitHub repository settings
2. Verify that the webhook URL is accessible from GitHub's servers
3. Check the webhook logs in GitHub for any delivery failures

## Performance Issues

### Problem: Reviews take too long to generate

**Solutions:**
1. Reduce the size of pull requests
2. Configure a shorter timeout for review generation
3. Use a more performant AI provider
4. Check server resources if self-hosting

### Problem: Dashboard is slow to load

**Solutions:**
1. Reduce the number of repositories connected to GitMate
2. Implement pagination for repository and review lists
3. Optimize database queries if self-hosting

## Common Error Messages

### "AI provider timeout after 60 seconds"

This error occurs when the AI provider takes too long to generate a review.

**Solutions:**
1. Try again later when the AI service might be less busy
2. Use a different AI provider
3. Reduce the size of the pull request

### "GitHub API error: 401 Unauthorized"

This error indicates that your GitHub token is invalid or has expired.

**Solutions:**
1. Sign out and sign back in to refresh your token
2. Check that your GitHub token has the necessary permissions

### "GitHub API error: 403 Forbidden"

This error indicates that your GitHub token doesn't have permission to access the repository.

**Solutions:**
1. Ensure GitMate is installed on the repository
2. Check that your GitHub token has the repo scope

### "GitHub API request timed out after 30 seconds"

This error occurs when GitHub's API takes too long to respond.

**Solutions:**
1. Try again later when GitHub might be less busy
2. Check GitHub's status page for any ongoing issues

## Still Having Problems?

If you're still experiencing issues after trying these solutions:

1. Check the server logs for more detailed error messages
2. Contact support at support@gitmate.app with details about your issue
3. Visit our community forum for peer assistance

