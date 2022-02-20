interface NewPostPayload {
  title: string;
  body: string;
}

export async function getPosts() {
  const response = await fetch("http://localhost:3000/api/v1/posts");
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
  const response = await fetch(
    "http://localhost:3000/api/v1/posts",
    requestInfo
  );
  const createdPost = await response.json();
  return createdPost;
}
