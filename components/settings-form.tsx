import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useToast} from "@/components/ui/use-toast";
import {Loader2} from "lucide-react";

export function SettingsForm() {
  const {toast} = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    githubToken: "",
    openaiKey: "",
    googleKey: ""
  });

  // Fetch current settings on component mount
  useState(() => {
    fetchSettings();
  });

  async function fetchSettings() {
    try {
      const response = await fetch("/api/settings");
      if (!response.ok) throw new Error("Failed to fetch settings");
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast({
        title: "Error",
        description: "Failed to load settings. Please try again.",
        variant: "destructive"
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed to save settings");

      toast({
        title: "Success",
        description: "Settings saved successfully."
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='githubToken'>GitHub Personal Access Token</Label>
        <Input id='githubToken' name='githubToken' type='password' value={formData.githubToken} onChange={handleChange} placeholder='ghp_...' required />
        <p className='text-sm text-muted-foreground'>
          Required for accessing repositories and creating comments. Create one at{" "}
          <a href='https://github.com/settings/tokens' target='_blank' rel='noopener noreferrer' className='text-primary hover:underline'>
            GitHub Settings
          </a>
        </p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='openaiKey'>OpenAI API Key</Label>
        <Input id='openaiKey' name='openaiKey' type='password' value={formData.openaiKey} onChange={handleChange} placeholder='sk-...' />
        <p className='text-sm text-muted-foreground'>
          Optional. Get one at{" "}
          <a href='https://platform.openai.com/api-keys' target='_blank' rel='noopener noreferrer' className='text-primary hover:underline'>
            OpenAI Platform
          </a>
        </p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='googleKey'>Google API Key</Label>
        <Input id='googleKey' name='googleKey' type='password' value={formData.googleKey} onChange={handleChange} placeholder='AIza...' />
        <p className='text-sm text-muted-foreground'>
          Optional. Get one at{" "}
          <a href='https://makersuite.google.com/app/apikey' target='_blank' rel='noopener noreferrer' className='text-primary hover:underline'>
            Google AI Studio
          </a>
        </p>
      </div>

      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        Save Changes
      </Button>
    </form>
  );
}
