export default function AISettingsPage() {
  return (
    <div className='flex flex-col items-center py-10 px-6 md:px-12 lg:px-24'>
      <div className='max-w-3xl w-full space-y-6'>
        <h1 className='text-3xl font-bold text-center'>AI Settings Configuration</h1>

        <section>
          <h2 className='text-2xl font-semibold'>Choosing an AI Provider</h2>
          <p>GitMate supports two AI providers for code reviews:</p>
          <ul className='list-disc list-inside space-y-2'>
            <li>
              <strong>OpenAI (GPT-4):</strong> Advanced code analysis with deep understanding
            </li>
            <li>
              <strong>Google (Gemini):</strong> Fast and efficient code reviews
            </li>
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold'>Setting Up API Keys</h2>
          <p>To use GitMate's AI features, you need to provide an API key for your chosen provider:</p>

          <h3 className='text-xl font-medium'>For OpenAI:</h3>
          <ol className='list-decimal list-inside space-y-2'>
            <li>
              Go to{" "}
              <a href='https://platform.openai.com/api-keys' target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>
                OpenAI API Keys
              </a>
            </li>
            <li>Create a new API key</li>
            <li>Copy the key and paste it in GitMate's settings</li>
          </ol>

          <h3 className='text-xl font-medium'>For Google (Gemini):</h3>
          <ol className='list-decimal list-inside space-y-2'>
            <li>
              Go to{" "}
              <a href='https://makersuite.google.com/app/apikey' target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>
                Google AI Studio
              </a>
            </li>
            <li>Create a new API key</li>
            <li>Copy the key and paste it in GitMate's settings</li>
          </ol>
        </section>

        <section>
          <h2 className='text-2xl font-semibold'>Configuring Review Settings</h2>
          <p>After setting up your API key, you can configure:</p>
          <ul className='list-disc list-inside space-y-2'>
            <li>Default AI provider for all repositories</li>
            <li>Review tone (Constructive Critic, Friendly Mentor, or Enthusiastic Coach)</li>
            <li>Automatic review triggers</li>
          </ul>
        </section>

        <div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg'>
          <h3 className='text-lg font-semibold'>Next Steps</h3>
          <p className='text-gray-700 dark:text-gray-300'>
            Once you've configured your AI settings, you can start using GitMate to review your code. Check out the
            <a href='/docs/introduction/how-it-works' className='text-blue-600 underline'>
              How it Works
            </a>{" "}
            guide to learn more.
          </p>
        </div>
      </div>
    </div>
  );
}
