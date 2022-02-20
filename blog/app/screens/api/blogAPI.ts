export async function getPosts() {
  const response = await fetch("http://localhost:3000/api/v1/posts");
  const posts = await response.json();
  return posts;
}
