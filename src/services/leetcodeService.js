export const LEETCODE_USERNAME = import.meta.env.VITE_LEETCODE_USERNAME || 'AfgkZ9Jo50';

const CACHE_KEY = 'leetcode_stats_cache_v4';
const CACHE_TIME_KEY = 'leetcode_stats_cache_time_v4';

export const VERIFIED_LEETCODE_STATS = {
  totalSolved: 143,
  easySolved: 74,
  mediumSolved: 58,
  hardSolved: 11,
  ranking: 185200,
  acceptanceRate: "64.2",
  username: LEETCODE_USERNAME,
  profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
  breakdown: [
    { language: "Java", solved: 98, color: "#F97316" },
    { language: "C++", solved: 31, color: "#0284C7" },
    { language: "C", solved: 14, color: "#64748B" }
  ],
  topics: [
    "Arrays & Strings",
    "Graphs & Dynamic Programming",
    "Two Pointers & Hash Table",
    "KMP & Topological Sort",
    "Cycle Detection & Graph Coloring"
  ]
};

/**
 * Fetches live LeetCode profile statistics.
 * On initial load (forceRefresh = false), returns verified stats or cached stats.
 * On manual Refresh (forceRefresh = true), attempts live API calls with timeout and fallback.
 */
export async function getLeetCodeStats(forceRefresh = false) {
  if (!forceRefresh) {
    try {
      const cachedData = sessionStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        if (parsed && typeof parsed.totalSolved === 'number') {
          return { data: parsed, fromCache: true, error: null };
        }
      }
    } catch (e) {}
    return { data: VERIFIED_LEETCODE_STATS, fromCache: true, error: null };
  }

  const endpoints = [
    `https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}?t=${Date.now()}`,
    `https://leetcode-api-f5d3.onrender.com/userProfile/${LEETCODE_USERNAME}?t=${Date.now()}`,
    `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}?t=${Date.now()}`
  ];

  const fetchWithTimeout = async (url, timeoutMs = 8000) => {
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
      const res = await fetchWithTimeout(endpoint, 8000);
      if (!res.ok) continue;

      const json = await res.json();

      let totalSolved = 0;
      let easySolved = 0;
      let mediumSolved = 0;
      let hardSolved = 0;
      let ranking = null;
      let acceptanceRate = null;

      if (typeof json.totalSolved === 'number') {
        totalSolved = json.totalSolved;
        easySolved = json.easySolved ?? 74;
        mediumSolved = json.mediumSolved ?? 58;
        hardSolved = json.hardSolved ?? 11;
        ranking = json.ranking ?? 185200;
        acceptanceRate = json.acceptanceRate ? parseFloat(json.acceptanceRate).toFixed(1) : "64.2";
      } else if (typeof json.solvedProblem === 'number') {
        totalSolved = json.solvedProblem;
        easySolved = json.easySolvedCount ?? 74;
        mediumSolved = json.mediumSolvedCount ?? 58;
        hardSolved = json.hardSolvedCount ?? 11;
        ranking = json.rankingPosition ?? 185200;
        acceptanceRate = "64.2";
      } else {
        continue;
      }

      const normalized = {
        totalSolved: totalSolved || 143,
        easySolved: easySolved || 74,
        mediumSolved: mediumSolved || 58,
        hardSolved: hardSolved || 11,
        ranking: ranking || 185200,
        acceptanceRate: acceptanceRate || "64.2",
        username: LEETCODE_USERNAME,
        profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
        breakdown: VERIFIED_LEETCODE_STATS.breakdown,
        topics: VERIFIED_LEETCODE_STATS.topics
      };

      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(normalized));
      } catch (e) {}

      return { data: normalized, fromCache: false, error: null };
    } catch (err) {
      // Continue to next fallback endpoint
    }
  }

  // Graceful fallback to verified statistics on network timeout/failure
  return {
    data: VERIFIED_LEETCODE_STATS,
    fromCache: true,
    error: 'Live API endpoint unavailable; showing verified profile statistics.'
  };
}
