import {useState, useEffect} from "react";

interface Settings {
  googleApiKey: string;
  openaiApiKey: string;
  githubToken: string;
  githubSecret: string;
  defaultAiProvider: string;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    googleApiKey: "",
    openaiApiKey: "",
    githubToken: "",
    githubSecret: "",
    defaultAiProvider: "gemini"
  });

  useEffect(() => {
    // Load settings from localStorage on mount
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = {...settings, ...newSettings};
    setSettings(updatedSettings);
    localStorage.setItem("userSettings", JSON.stringify(updatedSettings));
  };

  return {
    settings,
    updateSettings
  };
}
