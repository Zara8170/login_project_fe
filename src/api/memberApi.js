import axios from "axios";
import { API_URL } from "../config/apiConfig";

const API_BASE = `${API_URL}/api/member`;

export const joinMember = async (joinData) => {
  return axios.post(`${API_BASE}/join`, joinData);
};

export const loginMember = async (loginData) => {
  return axios.post(`${API_BASE}/login`, loginData, {
    withCredentials: true, // 쿠키 포함 (refreshToken)
  });
};

export const logoutMember = async () => {
  return axios.post(
    `${API_BASE}/logout`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const deleteMember = async () => {
  return axios.delete(`${API_BASE}`, {
    withCredentials: true,
  });
};

export const checkEmail = async (email) => {
  return axios.get(`${API_BASE}/check-email/${email}`);
};
