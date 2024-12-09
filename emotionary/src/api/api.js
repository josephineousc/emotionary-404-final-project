const API_BASE_URL = "http://localhost:3000"; // Ensure your JSON Server is running on this URL

// USERS
export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  return response.json();
}

// MEDIA
export async function fetchMedia() {
  const response = await fetch(`${API_BASE_URL}/media`);
  return response.json();
}

export async function fetchMediaById(mediaId) {
  const response = await fetch(`${API_BASE_URL}/media/${mediaId}`);
  return response.json();
}

// EMOTIONS
export async function fetchEmotions() {
  const response = await fetch(`${API_BASE_URL}/emotions`);
  return response.json();
}

export async function createEmotion(emotion) {
  const response = await fetch(`${API_BASE_URL}/emotions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emotion),
  });
  return response.json();
}

export async function updateEmotion(emotionId, updatedEmotion) {
  const response = await fetch(`${API_BASE_URL}/emotions/${emotionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEmotion),
  });
  return response.json();
}

export async function deleteEmotion(emotionId) {
  const response = await fetch(`${API_BASE_URL}/emotions/${emotionId}`, {
    method: "DELETE",
  });
  return response.ok;
}

// COMMENTS
export async function fetchCommentsByEmotionId(emotionId) {
  const response = await fetch(`${API_BASE_URL}/comments?emotionId=${emotionId}`);
  return response.json();
}

export async function createComment(comment) {
  const response = await fetch(`${API_BASE_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  return response.json();
}

// BOOKMARKS
export async function fetchBookmarksByUserId(userId) {
  const response = await fetch(`${API_BASE_URL}/bookmarks?userId=${userId}`);
  return response.json();
}

export async function createBookmark(bookmark) {
  const response = await fetch(`${API_BASE_URL}/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookmark),
  });
  return response.json();
}

export async function deleteBookmark(bookmarkId) {
  const response = await fetch(`${API_BASE_URL}/bookmarks/${bookmarkId}`, {
    method: "DELETE",
  });
  return response.ok;
}
