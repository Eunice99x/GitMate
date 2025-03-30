import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {InfoIcon} from "lucide-react";

export function GitHubTokenGuide() {
  return (
    <Alert className='mt-4'>
      <InfoIcon className='h-4 w-4' />
      <AlertTitle>Creating a GitHub Personal Access Token</AlertTitle>
      <AlertDescription>
        <ol className='list-decimal pl-5 space-y-1 text-sm mt-2'>
          <li>
            Go to{" "}
            <a href='https://github.com/settings/tokens' target='_blank' rel='noopener noreferrer' className='text-primary hover:underline'>
              GitHub Personal Access Tokens
            </a>
          </li>
          <li>Click "Generate new token" → "Generate new token (classic)"</li>
          <li>Give your token a descriptive name like "GitMate"</li>
          <li>Set an expiration date (recommended: 90 days)</li>
          <li>
            Select these scopes:
            <ul className='list-disc pl-5 mt-1'>
              <li>
                <strong>repo</strong> (Full control of private repositories)
              </li>
              <li>
                <strong>read:user</strong> (Read user profile data)
              </li>
              <li>
                <strong>user:email</strong> (Access user email addresses)
              </li>
            </ul>
          </li>
          <li>Click "Generate token" and copy the token immediately</li>
          <li>
            Paste the token here (it should start with <code className='bg-muted px-1 py-0.5 rounded'>ghp_</code>)
          </li>
        </ol>
      </AlertDescription>
    </Alert>
  );
}
