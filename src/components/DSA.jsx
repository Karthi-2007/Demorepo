import React, { useState, useEffect } from 'react';
import { ExternalLink, RotateCw, AlertCircle } from 'lucide-react';
import { getLeetCodeStats, LEETCODE_USERNAME, VERIFIED_LEETCODE_STATS } from '../services/leetcodeService';
import { leetCodeData as fallbackData } from '../data/portfolioData';

export default function DSA() {
  const [stats, setStats] = useState(VERIFIED_LEETCODE_STATS);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async (force = false) => {
    if (force) {
      if (refreshing || loading) return;
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const result = await getLeetCodeStats(force);
      if (result.data) {
        setStats(result.data);
      }
    } catch (err) {
      // Keep existing stats on error
    }

    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchStats(false);
  }, []);

  const handleRefresh = (e) => {
    e.preventDefault();
    if (!refreshing && !loading) {
      fetchStats(true);
    }
  };

  const currentStats = stats || VERIFIED_LEETCODE_STATS;
  const username = currentStats?.username || LEETCODE_USERNAME;
  const profileUrl = currentStats?.profileUrl || `https://leetcode.com/u/${username}/`;
  const topicsList = currentStats?.topics || fallbackData?.topics || [];

  return (
    <section id="dsa" className="section-padding bg-slate-50 border-b border-slate-200">
      <div className="site-container space-y-10">
        
        {/* Section Header with Live Indicator & Refresh Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-accentOrange font-extrabold">
                Algorithm Practice
              </span>
              <span className="badge-orange-light text-[10px] font-mono py-0.5 px-2">
                ● DYNAMIC LIVE
              </span>
            </div>
            <h2 className="section-title font-extrabold text-textPrimary tracking-tight mt-1">
              Problem Solving & DSA
            </h2>
            <p className="text-sm text-textSecondary mt-1">
              Live LeetCode statistics dynamically retrieved for handle @{username}.
            </p>
            <div className="w-12 h-1 bg-accentOrange rounded-full mt-3" />
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading || refreshing}
            className="btn-secondary-light text-xs py-2 px-3 self-start sm:self-auto flex items-center gap-1.5 font-mono disabled:opacity-50 cursor-pointer"
            title="Fetch fresh LeetCode statistics"
          >
            <RotateCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-accentOrange' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Loading UI State */}
        {loading ? (
          <div className="space-y-4">
            <p className="text-xs font-mono text-textSecondary animate-pulse">Loading LeetCode statistics...</p>
            <div className="light-card p-8 bg-white space-y-6 animate-pulse">
              <div className="h-6 bg-slate-200 rounded w-1/3" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="h-20 bg-slate-200 rounded" />
                <div className="h-20 bg-slate-200 rounded" />
                <div className="h-20 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        ) : (
          /* Live LeetCode Dynamic Stats Showcase */
          <div className="light-card p-6 sm:p-8 bg-white space-y-6 border border-slate-200 shadow-card">
            
            {/* Header Metrics */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono text-accentOrange uppercase font-bold">
                  LeetCode Handle: @{username}
                </span>
                <h3 className="text-3xl font-extrabold text-textPrimary tracking-tight mt-1">
                  {currentStats?.totalSolved ?? 143}{' '}
                  <span className="text-base font-normal text-textSecondary">Verified Solved Problems</span>
                </h3>
              </div>

              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-orange text-xs py-2.5 px-4 self-start sm:self-auto"
              >
                <span>View LeetCode Profile →</span>
              </a>
            </div>

            {/* Easy / Medium / Hard Difficulty Breakdown */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-textSecondary font-bold mb-3">
                Difficulty Breakdown:
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                  <span className="text-xs font-mono text-emerald-800 font-bold block uppercase">Easy</span>
                  <span className="text-2xl font-extrabold text-emerald-900 block">{currentStats?.easySolved ?? 74}</span>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-1">
                  <span className="text-xs font-mono text-amber-800 font-bold block uppercase">Medium</span>
                  <span className="text-2xl font-extrabold text-amber-900 block">{currentStats?.mediumSolved ?? 58}</span>
                </div>

                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-center space-y-1">
                  <span className="text-xs font-mono text-rose-800 font-bold block uppercase">Hard</span>
                  <span className="text-2xl font-extrabold text-rose-900 block">{currentStats?.hardSolved ?? 11}</span>
                </div>
              </div>
            </div>

            {/* Additional Metrics (Global Ranking & Acceptance Rate) */}
            {(currentStats?.ranking || currentStats?.acceptanceRate) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                {currentStats.ranking && (
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono flex items-center justify-between">
                    <span className="text-textSecondary font-semibold">Global Ranking</span>
                    <span className="text-textPrimary font-extrabold">#{Number(currentStats.ranking).toLocaleString()}</span>
                  </div>
                )}
                {currentStats.acceptanceRate && (
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono flex items-center justify-between">
                    <span className="text-textSecondary font-semibold">Acceptance Rate</span>
                    <span className="text-textPrimary font-extrabold">{currentStats.acceptanceRate}%</span>
                  </div>
                )}
              </div>
            )}

            {/* Algorithmic Problem Domains */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-mono uppercase tracking-wider text-textSecondary font-bold mb-3">
                Algorithmic Problem Domains:
              </h4>
              <div className="flex flex-wrap gap-2">
                {topicsList.map((topic, idx) => (
                  <span key={idx} className="tech-tag-light bg-slate-100 text-slate-800 font-semibold px-3 py-1 text-xs">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
