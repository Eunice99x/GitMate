import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {InfoIcon} from "lucide-react";

export default function GitHubSetupPage() {
  return (
    <div className='space-y-6 lg:space-y-10'>
      <div className='space-y-2'>
        <h1 className='scroll-m-20 text-4xl font-bold tracking-tight'>GitHub Setup Guide</h1>
        <p className='text-lg text-muted-foreground'>Follow these steps to install and configure GitMate on your GitHub repositories.</p>
      </div>

      <Alert>
        <InfoIcon className='h-4 w-4' />
        <AlertTitle>Important!</AlertTitle>
        <AlertDescription>Ensure you have the necessary permissions before installing GitMate.</AlertDescription>
      </Alert>

      <div className='space-y-4'>
        <h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Installation</h2>
        <p>To get started with GitMate, follow these steps:</p>
        <ol className='list-decimal pl-5 space-y-2'>
          <li>Click the "Install on GitHub" button in the navigation bar.</li>
          <li>Select the repositories you want to enable GitMate on.</li>
          <li>Authorize the required permissions.</li>
        </ol>
      </div>

      <div className='space-y-4'>
        <h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Required Permissions</h2>
        <p>GitMate needs the following permissions to function correctly:</p>
        <ul className='list-disc pl-5 space-y-2'>
          <li>Read access to code and metadata.</li>
          <li>Read and write access to pull requests.</li>
          <li>Read and write access to pull request comments.</li>
        </ul>
      </div>

      <div className='space-y-4'>
        <h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Configuration</h2>
        <p>After installation, configure GitMate by following these steps:</p>
        <ol className='list-decimal pl-5 space-y-2'>
          <li>
            <strong>Configure AI Provider:</strong>
            <ul className='list-disc pl-5 space-y-2'>
              <li>Choose between OpenAI or Google's Gemini.</li>
              <li>Add your API key in the settings.</li>
            </ul>
          </li>
          <li>
            <strong>Repository Settings:</strong>
            <ul className='list-disc pl-5 space-y-2'>
              <li>Enable/disable automatic reviews.</li>
              <li>Configure review triggers.</li>
              <li>Set review preferences.</li>
            </ul>
          </li>
        </ol>
      </div>

      <div className='space-y-4'>
        <h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Next Steps</h2>
        <p>
          Once GitMate is set up, head to{" "}
          <a href='/docs/configuration/ai-settings' className='text-primary hover:underline'>
            AI Settings
          </a>{" "}
          to configure your preferred AI provider.
        </p>
      </div>
    </div>
  );
}
