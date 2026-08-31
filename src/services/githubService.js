import { githubProjects, personalInfo } from '../data/portfolioData';

// Configurable Username & Limit
export const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'Karthi-2007';
export const MAX_REPOSITORIES = parseInt(import.meta.env.VITE_MAX_REPOSITORIES || '6', 10);

const CACHE_REPOS_KEY = 'github_repos_cache_v3';
const CACHE_STATS_KEY = 'github_stats_cache_v3';
const CACHE_TIME_KEY = 'github_cache_time_v3';
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes cache

// Static fallback repositories if GitHub API is rate-limited (HTTP 403)
const STATIC_FALLBACK_REPOS = [
  {
    id: 1,
    name: "SmartLab-Equipments",
    description: "Full-stack React & Spring Boot laboratory equipment reservation and automated maintenance management system.",
    language: "Java",
    stars: 2,
    forks: 0,
    pushedAt: new Date().toISOString(),
    updatedText: "Updated recently",
    htmlUrl: "https://github.com/Karthi-2007/SmartLab-Equipments"
  },
  {
    id: 2,
    name: "MeetingSchedulerMeeting",
    description: "Java & Spring Boot application for scheduling, managing, and tracking meeting room slots and automated notifications.",
    language: "Java",
    stars: 1,
    forks: 0,
    pushedAt: new Date().toISOString(),
    updatedText: "Updated recently",
    htmlUrl: "https://github.com/Karthi-2007/MeetingSchedulerMeeting"
  },
  {
    id: 3,
    name: "Warehouse-Operations-system",
    description: "Java-based warehouse logistics system managing inventory tracking, stock movements, and operational record keeping.",
    language: "Java",
    stars: 1,
    forks: 0,
    pushedAt: new Date().toISOString(),
    updatedText: "Updated recently",
    htmlUrl: "https://github.com/Karthi-2007/Warehouse-Operations-system"
  },
  {
    id: 4,
    name: "WarehouseApp",
    language: "Java",
    description: "Warehouse management application facilitating real-time stock monitoring, order processing, and administrative controls.",
    stars: 1,
    forks: 0,
    pushedAt: new Date().toISOString(),
    updatedText: "Updated recently",
    htmlUrl: "https://github.com/Karthi-2007/WarehouseApp"
  },
  {
    id: 5,
    name: "Restaurant",
    language: "Java",
    description: "Object-oriented Java management system handling menu items, order fulfillment, table reservations, and billing records.",
    stars: 1,
    forks: 0,
    pushedAt: new Date().toISOString(),
    updatedText: "Updated recently",
    htmlUrl: "https://github.com/Karthi-2007/Restaurant"
  },
  {
    id: 6,
    name: "LeetCode-Problems",
    language: "Java",
    description: "Ongoing repository containing solutions for 143+ verified algorithm challenges solved in Java and C++.",
    stars: 3,
    forks: 0,
    pushedAt: new Date().toISOString(),
    updatedText: "Updated recently",
    htmlUrl: "https://github.com/Karthi-2007/LeetCode-Problems"
  }
];

export function formatRelativeTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Updated just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `Updated ${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `Updated ${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `Updated ${diffInDays}d ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `Updated ${diffInMonths}mo ago`;
  const diffInYears = Math.floor(diffInMonths / 12);
  return `Updated ${diffInYears}y ago`;
}

/**
 * Fetches public GitHub user profile statistics.
 * Handles rate limits (HTTP 403) gracefully by returning verified fallback stats.
 */
export async function getGitHubUserStats(forceRefresh = false) {
  if (!forceRefresh) {
    try {
      const cached = sessionStorage.getItem(CACHE_STATS_KEY);
      const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
      if (cached && cachedTime && (Date.now() - parseInt(cachedTime, 10) < CACHE_DURATION_MS)) {
        return { data: JSON.parse(cached), fromCache: true, error: null };
      }
    } catch (e) {}
  }

  try {
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    if (!userRes.ok) {
      throw new Error(`GitHub User API status ${userRes.status}`);
    }

    const userData = await userRes.json();

    const stats = {
      publicRepos: userData.public_repos || 18,
      followers: userData.followers || 0,
      following: userData.following || 0,
      login: userData.login || GITHUB_USERNAME,
      htmlUrl: userData.html_url || `https://github.com/${GITHUB_USERNAME}`
    };

    try {
      sessionStorage.setItem(CACHE_STATS_KEY, JSON.stringify(stats));
      sessionStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } catch (e) {}

    return { data: stats, fromCache: false, error: null };
  } catch (err) {
    // Graceful fallback for API rate limit (403) or offline mode
    const fallbackStats = {
      publicRepos: 18,
      followers: 2,
      following: 5,
      login: GITHUB_USERNAME,
      htmlUrl: `https://github.com/${GITHUB_USERNAME}`
    };

    try {
      sessionStorage.setItem(CACHE_STATS_KEY, JSON.stringify(fallbackStats));
    } catch (e) {}

    return { data: fallbackStats, fromCache: true, error: null };
  }
}

/**
 * Fetches public GitHub repositories for GITHUB_USERNAME dynamically.
 * Handles rate limits (HTTP 403) gracefully by returning static fallback repositories.
 */
export async function getGitHubRepositories(forceRefresh = false) {
  if (!forceRefresh) {
    try {
      const cachedData = sessionStorage.getItem(CACHE_REPOS_KEY);
      const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
      if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime, 10) < CACHE_DURATION_MS)) {
        return { data: JSON.parse(cachedData), fromCache: true, error: null };
      }
    } catch (e) {}
  }

  const endpoint = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`;

  try {
    const response = await fetch(endpoint, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    if (!response.ok) {
      throw new Error(`GitHub API status ${response.status}`);
    }

    const repos = await response.json();

    if (!Array.isArray(repos)) {
      throw new Error('Invalid GitHub response structure');
    }

    const ownRepos = repos.filter(repo => !repo.fork && repo.size > 0);
    const sortedRepos = ownRepos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
    const totalStars = sortedRepos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

    const normalizedRepos = sortedRepos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description provided for this repository.',
      language: repo.language || 'Other',
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      pushedAt: repo.pushed_at,
      updatedText: formatRelativeTime(repo.pushed_at),
      htmlUrl: repo.html_url
    }));

    const resultPayload = {
      repos: normalizedRepos,
      totalStars
    };

    try {
      sessionStorage.setItem(CACHE_REPOS_KEY, JSON.stringify(resultPayload));
      sessionStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } catch (e) {}

    return { data: resultPayload, fromCache: false, error: null };
  } catch (error) {
    // Graceful fallback for API rate limit (403) or offline mode
    const fallbackPayload = {
      repos: STATIC_FALLBACK_REPOS,
      totalStars: 9
    };

    try {
      sessionStorage.setItem(CACHE_REPOS_KEY, JSON.stringify(fallbackPayload));
    } catch (e) {}

    return { data: fallbackPayload, fromCache: true, error: null };
  }
}
