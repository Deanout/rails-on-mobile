const API_URL = "http://localhost:3000/api/v1/";
interface NewPostPayload {
  title: string;
  body: string;
}

interface NewUserRegistrationPayload {
  email: string;
  password: string;
  password_confirmation: string;
}

interface NewUserSessionPayload {
  email: string;
  password: string;
}

interface DestroyUserSessionPayload {
  email: string;
  password: string;
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

export async function registerUser(payload: NewUserRegistrationPayload) {
  const requestInfo = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${API_URL}users/sign_up`, requestInfo);
  const createdUser = await response.json();
  return createdUser;
}

export async function loginUser(payload: NewUserSessionPayload) {
  const requestInfo = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${API_URL}users/sign_in`, requestInfo);
  const loggedInUser = await response.json();
  return loggedInUser;
}

export async function logoutUser(payload: DestroyUserSessionPayload) {
  const requestInfo = {
    method: "DELETE",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${API_URL}users/sign_out`, requestInfo);
  const loggedOutUser = await response.json();
  return loggedOutUser;
}
