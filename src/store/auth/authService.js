import axios from "axios";

const url = "http://localhost:8000/";

// Register user
const register = async (userData) => {
  const response = await axios.post(url, userData);

  //   if (response.data) {
  //     localStorage.setItem("user", JSON.stringify(response.data));
  //   }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(url + "login", userData);
  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data));
  }
  return response.data;
};

// Get user
const user = async () => {
  const response = await axios.get(url + "user");
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.get(url + "logout");
  if (response) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
};

const authService = {
  register,
  user,
  logout,
  login,
};

export default authService;
