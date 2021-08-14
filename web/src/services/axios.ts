import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

export const http = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
