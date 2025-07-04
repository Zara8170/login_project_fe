import axios from "axios";
import { API_URL, FRONT_USER_HOST } from "../config/apiConfig";

const CLIENT_IDS = {
  kakao: process.env.REACT_APP_KAKAO_CLIENT_ID,
  google: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  naver: process.env.REACT_APP_NAVER_CLIENT_ID,
  github: process.env.REACT_APP_GITHUB_CLIENT_ID,
  facebook: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
};

const REDIRECT_URIS = {
  kakao: `${FRONT_USER_HOST}/member/kakao`,
  google: `${FRONT_USER_HOST}/member/google`,
  naver: `${FRONT_USER_HOST}/member/naver`,
  github: `${FRONT_USER_HOST}/member/github`,
  facebook: `${FRONT_USER_HOST}/member/facebook`,
};

const AUTH_URLS = {
  kakao: "https://kauth.kakao.com/oauth/authorize",
  google: "https://accounts.google.com/o/oauth2/v2/auth",
  naver: "https://nid.naver.com/oauth2.0/authorize",
  github: "https://github.com/login/oauth/authorize",
  facebook: "https://www.facebook.com/v12.0/dialog/oauth",
};

// 로그인 URL 생성
export const getLoginLink = (provider) => {
  const url = new URL(AUTH_URLS[provider]);
  url.searchParams.append("client_id", CLIENT_IDS[provider]);
  url.searchParams.append("redirect_uri", REDIRECT_URIS[provider]);
  url.searchParams.append("response_type", "code");

  // 필요 시 scope 추가
  if (provider === "google") {
    url.searchParams.append("scope", "profile email");
    url.searchParams.append("access_type", "offline");
  } else if (provider === "facebook") {
    url.searchParams.append("scope", "email");
  } else if (provider === "github") {
    url.searchParams.append("scope", "user:email");
  }

  return url.toString();
};

// 토큰 요청 (백엔드에서 처리)
export const getAccessToken = async (code, provider) => {
  return axios.get(`${API_URL}/api/member/${provider}/token?code=${code}`);
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async (accessToken, provider) => {
  const headers = { withCredentials: true };
  const res = await axios.get(`${API_URL}/api/member/${provider}?accessToken=${accessToken}`, headers);
  return res.data;
};
