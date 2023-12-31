export async function registerUser(username, password) {
  const response = await fetch("api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const { success, message, data } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return { success, message, data };
}

export async function loginUser(username, password) {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const responseBody = await response.json();
  console.log("the api response:", responseBody);

  const { success, message, data } = responseBody;

  if (!success) {
    throw new Error(message);
  }
  return { success, message, data };
}

export async function fetchMe() {
  const response = await fetch("/api/users/me");
  const { success, message, user } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return { success, message, user };
}

export async function logout() {
  const response = await fetch("/api/users/logout");
  const { success, message, data } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return { success, message, data };
}

export async function getUserRoutines(username) {
  try {
    const response = await fetch(`/api/users/${username}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
