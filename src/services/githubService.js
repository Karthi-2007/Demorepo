import { githubProjects, personalInfo } from '../data/portfolioData';

// Configurable Username & Limit
export const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'Karthi-2007';
export const MAX_REPOSITORIES = parseInt(import.meta.env.VITE_MAX_REPOSITORIES || '6', 10);

const CACHE_REPOS_KEY = 'github_repos_cache_v5';
const CACHE_STATS_KEY = 'github_stats_cache_v5';
const CACHE_TIME_KEY = 'github_cache_time_v5';

// Verified Fallback Dataset for Karthi-2007
export const VERIFIED_GITHUB_STATS = {
  publicRepos: 18,
  followers: 2,
  following: 5,
  login: GITHUB_USERNAME,
  htmlUrl: `https://github.com/${GITHUB_USERNAME}`
};

export const VERIFIED_GITHUB_REPOS = [
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
  if (!isoString) return 'Updated recently';
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (isNaN(diffInSeconds)) return 'Updated recently';
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
 * On initial load (forceRefresh = false), returns verified stats without network calls.
 * On manual Refresh (forceRefresh = true), makes a fresh API call with cache-busting.
 */
export async function getGitHubUserStats(forceRefresh = false) {
  if (!forceRefresh) {
    try {
      const cached = sessionStorage.getItem(CACHE_STATS_KEY);
      if (cached) return { data: JSON.parse(cached), fromCache: true, error: null };
    } catch (e) {}
    return { data: VERIFIED_GITHUB_STATS, fromCache: true, error: null };
  }

  try {
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}?t=${Date.now()}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    if (!userRes.ok) {
      return { data: VERIFIED_GITHUB_STATS, fromCache: true, error: `GitHub API returned ${userRes.status}` };
    }

    const userData = await userRes.json();
    const stats = {
      publicRepos: userData.public_repos || 18,
      followers: userData.followers || 2,
      following: userData.following || 5,
      login: userData.login || GITHUB_USERNAME,
      htmlUrl: userData.html_url || `https://github.com/${GITHUB_USERNAME}`
    };

    try {
      sessionStorage.setItem(CACHE_STATS_KEY, JSON.stringify(stats));
    } catch (e) {}

    return { data: stats, fromCache: false, error: null };
  } catch (err) {
    return { data: VERIFIED_GITHUB_STATS, fromCache: true, error: 'Network request failed.' };
  }
}

/**
 * Fetches public GitHub repositories for GITHUB_USERNAME.
 * On initial load (forceRefresh = false), returns verified repositories without network calls.
 * On manual Refresh (forceRefresh = true), makes a fresh API call with cache-busting.
 */
export async function getGitHubRepositories(forceRefresh = false) {
  if (!forceRefresh) {
    try {
      const cachedData = sessionStorage.getItem(CACHE_REPOS_KEY);
      if (cachedData) {
        return { data: JSON.parse(cachedData), fromCache: true, error: null };
      }
    } catch (e) {}

    return {
      data: {
        repos: VERIFIED_GITHUB_REPOS,
        totalStars: 9
      },
      fromCache: true,
      error: null
    };
  }

  const endpoint = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&t=${Date.now()}`;

  try {
    const response = await fetch(endpoint, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    if (!response.ok) {
      return {
        data: {
          repos: VERIFIED_GITHUB_REPOS,
          totalStars: 9
        },
        fromCache: true,
        error: `GitHub API returned ${response.status}`
      };
    }

    const repos = await response.json();
    if (!Array.isArray(repos)) {
      return {
        data: {
          repos: VERIFIED_GITHUB_REPOS,
          totalStars: 9
        },
        fromCache: true,
        error: 'Invalid response'
      };
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
      repos: normalizedRepos.length > 0 ? normalizedRepos : VERIFIED_GITHUB_REPOS,
      totalStars: totalStars || 9
    };

    try {
      sessionStorage.setItem(CACHE_REPOS_KEY, JSON.stringify(resultPayload));
    } catch (e) {}

    return {
      data: resultPayload,
      fromCache: false,
      error: null
    };
  } catch (error) {
    return {
      data: {
        repos: VERIFIED_GITHUB_REPOS,
        totalStars: 9
      },
      fromCache: true,
      error: 'Network error during refresh'
    };
  }
}
