// GitHub Stats Service
const GITHUB_USERNAME = process.env.REACT_APP_GITHUB_USERNAME || 'Franz-kingstein';
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN || '';

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  total_contributions?: number;
}

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  forks_count?: number;
  language: string;
  description: string;
}

interface ContributionData {
  date: string;
  count: number;
}

interface StatsData {
  totalRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  languages: { [key: string]: number };
  contributions: ContributionData[];
  topRepositories: GitHubRepo[];
}

// Fetch user data from GitHub API
export const fetchGitHubStats = async (): Promise<StatsData | null> => {
  try {
    // Fetch user info
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!userResponse.ok) {
      console.error('Failed to fetch user data');
      return null;
    }

    const userData: GitHubUser = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=stars&direction=desc`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!reposResponse.ok) {
      console.error('Failed to fetch repositories');
      return null;
    }

    const repos: GitHubRepo[] = await reposResponse.json();

    // Calculate stats
    let totalStars = 0;
    let totalForks = 0;
    const languages: { [key: string]: number } = {};
    const topRepositories = repos.slice(0, 6);

    repos.forEach((repo) => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count || 0;

      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    // Generate mock contribution data (last 10 days)
    const contributions = generateContributionData();

    return {
      totalRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      totalStars,
      totalForks,
      languages,
      contributions,
      topRepositories,
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
};

// Generate mock contribution data for the graph
const generateContributionData = (): ContributionData[] => {
  const today = new Date();
  const contributions: ContributionData[] = [];

  for (let i = 10; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Create realistic contribution pattern
    const dayOfWeek = date.getDay();
    let count = 0;

    // More contributions on weekdays, fewer on weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      count = Math.floor(Math.random() * 2);
    } else {
      count = Math.floor(Math.random() * 6);
    }

    contributions.push({
      date: date.toISOString().split('T')[0],
      count,
    });
  }

  return contributions;
};

// Fetch LeetCode stats (if available via public API)
export const fetchLeetCodeStats = async (
  username: string
): Promise<{ solved: number; easy: number; medium: number; hard: number } | null> => {
  try {
    const response = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${username}`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return {
      solved: data.totalSolved,
      easy: data.easySolved,
      medium: data.mediumSolved,
      hard: data.hardSolved,
    };
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    return null;
  }
};

// Format numbers for display
export const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};
