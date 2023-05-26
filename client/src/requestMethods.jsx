import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user || '').currentUser.accessToken || ''
const localStorageItem = localStorage.getItem("persist:root");
const TOKEN = localStorageItem ? (JSON.parse(localStorageItem).user || '').currentUser?.accessToken || '' : '';
console.log(TOKEN)

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjI1ZDkzNTM3ZTdjMjYxNWUzNDgzYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NDUxMzg5NiwiZXhwIjoxNjg0NzczMDk2fQ.Pb6stLG71tk5-s5Y4js8wnmwaluyr88ED7M8j5MB6z4";

// const step1 = JSON.parse(localStorage.getItem('persist:root')).currentUser;
// const step2 = JSON.parse(step1)
// const TOKEN = step2["accessToken"];

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});