import config from "../config";

async function register(user) {
  const res = await fetch(config.apiUrl + "/user", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

async function login({ username, password }) {
  const res = await fetch(config.apiUrl + "/sign-in", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

async function isAvailable(username) {
  const res = await fetch(config.apiUrl + "/user/available", {
    method: "POST",
    body: JSON.stringify({ username }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

async function me() {
  const token = localStorage.getItem("token");
  if (!token) {
    return {};
  }
  const res = await fetch(config.apiUrl + "/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return res.json();
}

async function getUser(username) {
  const token = localStorage.getItem("token");
  if (!token) {
    return {};
  }
  const res = await fetch(config.apiUrl + "/user/" + username, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return res.json();
}

async function search(q) {
  const res = await fetch(config.apiUrl + "/search/user/" + q, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return res.json();
}

async function follow(username) {
  return fetch(config.apiUrl + "/user/" + username + "/follow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
}

async function unfollow(username) {
  return fetch(config.apiUrl + "/user/" + username + "/unfollow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
}

export { register, login, me, getUser, isAvailable, search, follow, unfollow };
