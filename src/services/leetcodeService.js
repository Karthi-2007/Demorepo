export const LEETCODE_USERNAME = import.meta.env.VITE_LEETCODE_USERNAME || 'AfgkZ9Jo50';

const CACHE_KEY = 'leetcode_stats_cache_v3';
const CACHE_TIME_KEY = 'leetcode_stats_cache_time_v3';
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes cache

/**
 * Fetches live LeetCode profile statistics dynamically.
 * Uses alfa-leetcode-api as primary endpoint with multi-tier fallbacks and timeout handling.
 */
export async function getLeetCodeStats(forceRefresh = false) {
  // Check sessionStorage cache unless forceRefresh is requested
  if (!forceRefresh) {
    try {
      const cachedData = sessionStorage.getItem(CACHE_KEY);
      const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
      if (cachedData && cachedTime) {
        const age = Date.now() - parseInt(cachedTime, 10);
        if (age < CACHE_DURATION_MS) {
          return { data: JSON.parse(cachedData), fromCache: true, error: null };
        }
      }
    } catch (e) {}
  }

  // Endpoints in order of reliability
  const endpoints = [
    `https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`,
    `https://leetcode-api-f5d3.onrender.com/userProfile/${LEETCODE_USERNAME}`,
    `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`
  ];

  const fetchWithTimeout = async (url, timeoutMs = 12000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      return res;
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  };

  for (const endpoint of endpoints) {
    try {
      const res = await fetchWithTimeout(endpoint, 12000);
      if (!res.ok) continue;

      const json = await res.json();

      // Normalize response from alfa-leetcode-api or standard APIs
      let totalSolved = 0;
      let easySolved = 0;
      let mediumSolved = 0;
      let hardSolved = 0;
      let ranking = null;
      let acceptanceRate = null;

      if (typeof json.totalSolved === 'number') {
        totalSolved = json.totalSolved;
        easySolved = json.easySolved ?? 0;
        mediumSolved = json.mediumSolved ?? 0;
        hardSolved = json.hardSolved ?? 0;
        ranking = json.ranking ?? null;
        acceptanceRate = json.acceptanceRate ? parseFloat(json.acceptanceRate).toFixed(1) : null;
      } else if (typeof json.solvedProblem === 'number') {
        totalSolved = json.solvedProblem;
        easySolved = json.easySolvedCount ?? 0;
        mediumSolved = json.mediumSolvedCount ?? 0;
        hardSolved = json.hardSolvedCount ?? 0;
        ranking = json.rankingPosition ?? null;
      } else {
        continue;
      }

      const normalized = {
        totalSolved,
        easySolved,
        mediumSolved,
        hardSolved,
        ranking,
        acceptanceRate,
        username: LEETCODE_USERNAME,
        profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`
      };

      // Save to sessionStorage cache
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(normalized));
        sessionStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      } catch (e) {}

      return { data: normalized, fromCache: false, error: null };
    } catch (err) {
      // Continue to next fallback endpoint
    }
  }

  // If all live endpoints fail, try expired cache as graceful fallback
  try {
    const cachedData = sessionStorage.getItem(CACHE_KEY);
    if (cachedData) {
      return { data: JSON.parse(cachedData), fromCache: true, error: null };
    }
  } catch (e) {}

  return {
    data: null,
    fromCache: false,
    error: 'Unable to load LeetCode statistics. Please try again later.'
  };
}
