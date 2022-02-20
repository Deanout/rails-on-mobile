const API_URL = "https://rails-on-mobile-o28t3.ondigitalocean.app/api/v1/";
interface NewPostPayload {
  title: string;
  body: string;
}

export async function getPosts() {
  const requestInfo = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${API_URL}posts`, requestInfo);
  const posts = await response.json();
  return posts;
}

export async function createPost(payload: NewPostPayload) {
  const requestInfo = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${API_URL}posts`, requestInfo);
  const createdPost = await response.json();
  return createdPost;
}
