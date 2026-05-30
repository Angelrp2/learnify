export async function fetchGitHubRepositories(topic = 'javascript-tutorial') {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=topic:${topic}&sort=stars&order=desc&per_page=6`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

export async function fetchRepositoryDetails(owner, repo) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching repository details:', error);
    return null;
  }
}
