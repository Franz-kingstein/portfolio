// GitHub Stats Service
const GITHUB_USERNAME = process.env.REACT_APP_GITHUB_USERNAME || 'Franz-kingstein';
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN || '';

// Only include Authorization header if token is set
const getHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (GITHUB_TOKEN) {
    headers.Authorization = `token ${GITHUB_TOKEN}`;
  }
  return headers;
};

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
export const fetchGitHubStats = async (): Promise<any | null> => {
  try {
    // Fetch user info
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: getHeaders(),
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
        headers: getHeaders(),
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
      repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      stars: totalStars,
      forks: totalForks,
      languages,
      contributions,
      topRepositories,
    };
  } catch (error) {
    console.error('Error fetching GitHub stats, using hardcoded data:', error);
    // Return a hardcoded fallback object on error
    return {
      repos: 117,
      followers: 7,
      following: 13,
      stars: 3,
      forks: 2,
      languages: {
        "Python": 35,
        "Jupyter Notebook": 20,
        "TypeScript": 15,
        "JavaScript": 10,
        "HTML": 5,
        "Dart": 10,
        "Solidity": 5,
      },
      contributions: generateContributionData(),
      topRepositories: [], // Can be left empty or filled with mock data
    };
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
): Promise<any | null> => {
  try {
    const response = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${username}`
    );

    if (!response.ok || response.status !== 200) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    
    if (data.status === "error") {
        throw new Error('API returned error');
    }

    return {
        totalSolved: data.totalSolved,
        easySolved: data.easySolved,
        totalEasy: data.totalEasy,
        mediumSolved: data.mediumSolved,
        totalMedium: data.totalMedium,
        hardSolved: data.hardSolved,
        totalHard: data.totalHard,
        ranking: data.ranking,
        acceptanceRate: data.acceptanceRate,
        username: username
    };
  } catch (error) {
    console.error('Error fetching LeetCode stats, using hardcoded data:', error);
    return {
        totalSolved: 93,
        easySolved: 69,
        totalEasy: 947,
        mediumSolved: 22,
        totalMedium: 2063,
        hardSolved: 2,
        totalHard: 938,
        ranking: 1623243,
        acceptanceRate: 45.2,
        username: "Franz_2005"
    };
  }
};

// Format numbers for display
export const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};
