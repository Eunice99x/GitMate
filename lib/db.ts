// Database utilities for GitMate
// In a real app, this would connect to a database like PostgreSQL, MongoDB, etc.
// For now, we'll use localStorage in the browser for persistence

import {useEffect, useState} from "react";

// Types
export interface Repository {
  id: number;
  name: string;
  enabled: boolean;
  reviewTone: "constructive" | "friendly" | "enthusiastic";
  aiProvider: "gemini" | "openai";
  autoReview: boolean;
  commandEnabled: boolean;
  maxReviewSize: number;
}

export interface Review {
  id: string;
  repositoryId: number;
  repositoryName: string;
  pullRequestId: number;
  pullRequestNumber: number;
  pullRequestTitle: string;
  createdAt: string;
  status: "completed" | "failed" | "pending";
  tone: string;
  provider: string;
  score: number | null;
  content: string | null;
}

export interface UserSettings {
  id: string;
  emailNotifications: boolean;
  weeklyDigest: boolean;
  notificationEvents: {
    newReviews: boolean;
    mentions: boolean;
    qualityAlerts: boolean;
  };
  defaultReviewTone: "constructive" | "friendly" | "enthusiastic";
  defaultAiProvider: "gemini" | "openai";
}

// Client-side "database" functions
export function useRepositories() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage on client side
    if (typeof window !== "undefined") {
      const storedRepos = localStorage.getItem("gitmate_repositories");
      if (storedRepos) {
        setRepositories(JSON.parse(storedRepos));
      }
      setLoading(false);
    }
  }, []);

  const saveRepositories = (repos: Repository[]) => {
    setRepositories(repos);
    if (typeof window !== "undefined") {
      localStorage.setItem("gitmate_repositories", JSON.stringify(repos));
    }
  };

  const getRepository = (id: number) => {
    return repositories.find(repo => repo.id === id);
  };

  const updateRepository = (id: number, data: Partial<Repository>) => {
    const updatedRepos = repositories.map(repo => (repo.id === id ? {...repo, ...data} : repo));
    saveRepositories(updatedRepos);
    return getRepository(id);
  };

  const addRepository = (repo: Repository) => {
    const exists = repositories.some(r => r.id === repo.id);
    if (exists) {
      return updateRepository(repo.id, repo);
    }
    const updatedRepos = [...repositories, repo];
    saveRepositories(updatedRepos);
    return repo;
  };

  const removeRepository = (id: number) => {
    const updatedRepos = repositories.filter(repo => repo.id !== id);
    saveRepositories(updatedRepos);
  };

  return {
    repositories,
    loading,
    getRepository,
    updateRepository,
    addRepository,
    removeRepository
  };
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage on client side
    if (typeof window !== "undefined") {
      const storedReviews = localStorage.getItem("gitmate_reviews");
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
      setLoading(false);
    }
  }, []);

  const saveReviews = (newReviews: Review[]) => {
    setReviews(newReviews);
    if (typeof window !== "undefined") {
      localStorage.setItem("gitmate_reviews", JSON.stringify(newReviews));
    }
  };

  const addReview = (review: Review) => {
    const updatedReviews = [...reviews, review];
    saveReviews(updatedReviews);
    return review;
  };

  const updateReview = (id: string, data: Partial<Review>) => {
    const updatedReviews = reviews.map(review => (review.id === id ? {...review, ...data} : review));
    saveReviews(updatedReviews);
    return updatedReviews.find(r => r.id === id);
  };

  const getReviewsByRepository = (repositoryId: number) => {
    return reviews.filter(review => review.repositoryId === repositoryId);
  };

  const getReviewsByPullRequest = (repositoryId: number, pullRequestNumber: number) => {
    return reviews.filter(review => review.repositoryId === repositoryId && review.pullRequestNumber === pullRequestNumber);
  };

  return {
    reviews,
    loading,
    addReview,
    updateReview,
    getReviewsByRepository,
    getReviewsByPullRequest
  };
}

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage on client side
    if (typeof window !== "undefined") {
      const storedSettings = localStorage.getItem("gitmate_user_settings");
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      } else {
        // Default settings
        const defaultSettings: UserSettings = {
          id: "user-1",
          emailNotifications: true,
          weeklyDigest: true,
          notificationEvents: {
            newReviews: true,
            mentions: true,
            qualityAlerts: true
          },
          defaultReviewTone: "constructive",
          defaultAiProvider: "gemini"
        };
        setSettings(defaultSettings);
        localStorage.setItem("gitmate_user_settings", JSON.stringify(defaultSettings));
      }
      setLoading(false);
    }
  }, []);

  const updateSettings = (data: Partial<UserSettings>) => {
    if (!settings) return null;

    const updatedSettings = {...settings, ...data};
    setSettings(updatedSettings);

    if (typeof window !== "undefined") {
      localStorage.setItem("gitmate_user_settings", JSON.stringify(updatedSettings));
    }

    return updatedSettings;
  };

  return {
    settings,
    loading,
    updateSettings
  };
}

// Analytics functions
export function getAnalyticsData(repositoryId?: number) {
  // In a real app, this would fetch analytics data from a database
  // For now, we'll generate random data

  const generateRandomData = (count: number) => {
    return Array.from({length: count}, (_, i) => ({
      date: new Date(Date.now() - (count - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      value: Math.floor(Math.random() * 10) + 1
    }));
  };

  return {
    reviewsOverTime: generateRandomData(30),
    qualityScoresOverTime: generateRandomData(30),
    issuesFoundOverTime: generateRandomData(30),
    repositoryPerformance: Array.from({length: 5}, (_, i) => ({
      id: i + 1,
      name: `repo-${i + 1}`,
      score: (Math.random() * 3 + 7).toFixed(1),
      reviews: Math.floor(Math.random() * 50) + 5
    })),
    developerPerformance: Array.from({length: 5}, (_, i) => ({
      id: i + 1,
      name: `developer-${i + 1}`,
      score: (Math.random() * 3 + 7).toFixed(1),
      reviews: Math.floor(Math.random() * 30) + 5
    })),
    commonIssues: [
      {name: "Missing error handling", count: Math.floor(Math.random() * 20) + 10},
      {name: "Unused variables", count: Math.floor(Math.random() * 15) + 5},
      {name: "Inefficient loops", count: Math.floor(Math.random() * 12) + 3},
      {name: "Inconsistent naming", count: Math.floor(Math.random() * 10) + 2},
      {name: "Hardcoded values", count: Math.floor(Math.random() * 8) + 1}
    ]
  };
}
