import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, RotateCw, AlertCircle, BookOpen } from 'lucide-react';
import { getGitHubRepositories, getGitHubUserStats, GITHUB_USERNAME, MAX_REPOSITORIES, VERIFIED_GITHUB_REPOS, VERIFIED_GITHUB_STATS } from '../services/githubService';

export default function GithubProjects() {
  const [repos, setRepos] = useState(VERIFIED_GITHUB_REPOS);
  const [userStats, setUserStats] = useState(VERIFIED_GITHUB_STATS);
  const [totalStars, setTotalStars] = useState(9);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchGitHubData = async (force = false) => {
    if (force) {
      if (refreshing || loading) return;
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const [repoRes, userRes] = await Promise.all([
        getGitHubRepositories(force),
        getGitHubUserStats(force)
      ]);

      if (repoRes.data?.repos && Array.isArray(repoRes.data.repos)) {
        setRepos(repoRes.data.repos);
        setTotalStars(repoRes.data.totalStars || 9);
      }

      if (userRes.data) {
        setUserStats(userRes.data);
      }
    } catch (err) {
      // Keep existing data on error
    }

    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchGitHubData(false);
  }, []);

  const handleRefresh = (e) => {
    e.preventDefault();
    if (!refreshing && !loading) {
      fetchGitHubData(true);
    }
  };

  const displayedRepos = (repos || []).slice(0, MAX_REPOSITORIES);

  return (
    <section className="section-padding bg-white border-b border-slate-200">
      <div className="site-container space-y-8">
        
        {/* Section Header with Live Indicator & Refresh Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-accentOrange font-extrabold">
                Public Repositories
              </span>
              <span className="badge-orange-light text-[10px] font-mono py-0.5 px-2">
                ● DYNAMIC LIVE
              </span>
            </div>
            <h2 className="section-title font-extrabold text-textPrimary tracking-tight mt-1">
              GitHub Projects
            </h2>
            <p className="text-sm text-textSecondary mt-1">
              Real-time public repositories fetched directly from GitHub profile (@{GITHUB_USERNAME}).
            </p>
            <div className="w-12 h-1 bg-accentOrange rounded-full mt-3" />
          </div>

          {/* Controls & Quick Stats */}
          <div className="flex items-center gap-3">
            {userStats && (
              <div className="hidden md:flex items-center gap-3 text-xs font-mono text-textSecondary bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <span>Repos: <strong className="text-textPrimary">{userStats.publicRepos}</strong></span>
                <span>•</span>
                <span>Total Stars: <strong className="text-textPrimary">{totalStars}</strong></span>
              </div>
            )}

            <button
              type="button"
              onClick={handleRefresh}
              disabled={loading || refreshing}
              className="btn-secondary-light text-xs py-2 px-3 self-start sm:self-auto flex items-center gap-1.5 font-mono disabled:opacity-50 cursor-pointer"
              title="Fetch fresh GitHub data"
            >
              <RotateCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-accentOrange' : ''}`} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Loading UI with Skeletons */}
        {loading ? (
          <div className="space-y-4">
            <p className="text-xs font-mono text-textSecondary animate-pulse">Loading GitHub repositories...</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="light-card p-6 space-y-4 bg-white animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                    <div className="h-4 bg-slate-200 rounded w-1/4" />
                  </div>
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-4/5" />
                  <div className="pt-4 border-t border-slate-100 flex justify-between">
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                    <div className="h-3 bg-slate-200 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error && displayedRepos.length === 0 ? (
          /* Error State */
          <div className="light-card p-8 bg-slate-50 border border-slate-200 text-center space-y-4 max-w-lg mx-auto">
            <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
            <div>
              <h3 className="text-base font-bold text-textPrimary">{error}</h3>
              <p className="text-xs text-textSecondary font-mono mt-1">
                You can view public repositories directly on GitHub.
              </p>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-orange text-xs py-2 px-4 inline-flex"
            >
              <span>View on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : displayedRepos.length === 0 ? (
          /* Empty Repositories Fallback */
          <div className="light-card p-8 bg-slate-50 border border-slate-200 text-center space-y-3 max-w-md mx-auto">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-textPrimary">No public repositories found.</h3>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-light text-xs py-2 px-4 inline-flex"
            >
              <span>Visit GitHub Profile</span>
            </a>
          </div>
        ) : (
          /* Repositories Grid */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedRepos.map((repo) => (
                <div key={repo.id || repo.name} className="light-card p-6 flex flex-col justify-between space-y-4 bg-white hover:border-slate-300 transition-all group">
                  <div className="space-y-2.5">
                    
                    {/* Repo Name & Primary Language */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <Github className="w-4.5 h-4.5 text-textPrimary shrink-0" />
                        <h3 className="text-base font-extrabold text-textPrimary font-mono truncate group-hover:text-accentOrange transition-colors" title={repo.name}>
                          {repo.name}
                        </h3>
                      </div>
                      <span className="badge-navy-light text-[10px] shrink-0 font-mono">
                        {repo.language}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-textSecondary line-clamp-2 leading-relaxed min-h-[2.5rem]">
                      {repo.description}
                    </p>

                  </div>

                  {/* Footer Stats & Link */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    
                    <div className="flex items-center justify-between text-[11px] font-mono text-textSecondary">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-slate-700 font-semibold" title="Stars">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>{repo.stars}</span>
                        </span>
                        <span className="flex items-center gap-1 text-slate-700 font-semibold" title="Forks">
                          <GitFork className="w-3.5 h-3.5 text-slate-500" />
                          <span>{repo.forks}</span>
                        </span>
                      </div>
                      <span className="text-slate-500 text-[10px] truncate max-w-[120px]">
                        {repo.updatedText}
                      </span>
                    </div>

                    <a
                      href={repo.htmlUrl || `https://github.com/${GITHUB_USERNAME}/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-light w-full text-xs py-2 justify-center"
                    >
                      <span>View Repository</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                  </div>
                </div>
              ))}
            </div>

            {/* View on GitHub Button */}
            <div className="text-center pt-2">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-orange text-xs py-2.5 px-6 inline-flex"
              >
                <span>View on GitHub →</span>
              </a>
            </div>
          </>
        )}

      </div>
    </section>
  );
}
