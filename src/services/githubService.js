import { personalInfo } from '../data/portfolioData';

// Configurable Username & Limit
export const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'Karthi-2007';
export const MAX_REPOSITORIES = parseInt(import.meta.env.VITE_MAX_REPOSITORIES || '6', 10);

const CACHE_REPOS_KEY = 'github_repos_cache_v2';
const CACHE_STATS_KEY = 'github_stats_cache_v2';
const CACHE_TIME_KEY = 'github_cache_time_v2';
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Formats ISO date string into a relative time string (e.g. "Updated 2 days ago")
 */
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
 * Fetches public GitHub user profile statistics (repos count, followers, following, stars).
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
      throw new Error(`GitHub User API returned status ${userRes.status}`);
    }

    const userData = await userRes.json();

    const stats = {
      publicRepos: userData.public_repos || 0,
      followers: userData.followers || 0,
      following: userData.following || 0,
      login: userData.login,
      htmlUrl: userData.html_url
    };

    try {
      sessionStorage.setItem(CACHE_STATS_KEY, JSON.stringify(stats));
      sessionStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } catch (e) {}

    return { data: stats, fromCache: false, error: null };
  } catch (err) {
    console.error('Failed to fetch GitHub user stats:', err);
    try {
      const cached = sessionStorage.getItem(CACHE_STATS_KEY);
      if (cached) return { data: JSON.parse(cached), fromCache: true, error: null };
    } catch (e) {}

    return { data: null, fromCache: false, error: 'Unable to load GitHub statistics. Please try again later.' };
  }
}

/**
 * Fetches public GitHub repositories for GITHUB_USERNAME dynamically.
 * Excludes forked and empty repositories.
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
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const repos = await response.json();

    if (!Array.isArray(repos)) {
      throw new Error('Invalid GitHub response structure');
    }

    // Filter out forked & empty repositories
    const ownRepos = repos.filter(repo => !repo.fork && repo.size > 0);

    // Sort by pushed_at descending so recently updated repos appear first
    const sortedRepos = ownRepos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

    // Calculate total stars
    const totalStars = sortedRepos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

    // Normalize repo data structure
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
    console.error('Failed to fetch GitHub repositories:', error);

    try {
      const cachedData = sessionStorage.getItem(CACHE_REPOS_KEY);
      if (cachedData) {
        return { data: JSON.parse(cachedData), fromCache: true, error: null };
      }
    } catch (e) {}

    return { data: null, fromCache: false, error: 'Unable to load GitHub data. Please try again later.' };
  }
}
