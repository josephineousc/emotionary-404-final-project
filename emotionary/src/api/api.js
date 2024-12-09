const API_BASE_URL = "http://localhost:4000";

// Generic fetch handler
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// USERS
export async function fetchUsers() {
  return fetchData(`${API_BASE_URL}/users`);
}

// MEDIA
export async function fetchMedia() {
  return fetchData(`${API_BASE_URL}/media`);
}

export async function fetchMediaById(mediaId) {
  return fetchData(`${API_BASE_URL}/media/${mediaId}`);
}

// EMOTIONS
export async function fetchEmotions() {
  return fetchData(`${API_BASE_URL}/emotions`);
}

export async function createEmotion(emotion) {
  try {
    const response = await fetch(`${API_BASE_URL}/emotions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emotion),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating emotion:", error);
    return null;
  }
}

// COMMENTS
export async function fetchCommentsByEmotionId(emotionId) {
  return fetchData(`${API_BASE_URL}/comments?emotionId=${emotionId}`);
}

// BOOKMARKS
export async function fetchBookmarksByUserId(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/bookmarks?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return [];
  }
}
