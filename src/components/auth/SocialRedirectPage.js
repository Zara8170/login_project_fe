import React, { useEffect, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { getAccessToken, getMemberWithAccessToken } from "../../api/socialApi";
import { login } from "../../redux/loginSlice";

const SUPPORTED_PROVIDERS = ["kakao", "google", "naver", "github", "facebook"];

const SocialRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const authCode = searchParams.get("code");
  const isCalledRef = useRef(false);

  // ex) /member/google → "google"
  const provider = location.pathname.split("/").pop();

  useEffect(() => {
    if (!authCode || isCalledRef.current || !SUPPORTED_PROVIDERS.includes(provider)) return;
    isCalledRef.current = true;

    const loginWithProvider = async () => {
      try {
        const accessTokenRes = await getAccessToken(authCode, provider);
        const accessToken = accessTokenRes.data || accessTokenRes;

        const memberInfo = await getMemberWithAccessToken(accessToken, provider);

        const safeMemberInfo = {
          email: memberInfo.email || "",
          nickname: memberInfo.nickname || "소셜회원",
          phone: memberInfo.phone || null,
          roles: memberInfo.roles || [],
          accessToken: memberInfo.accessToken || "",
        };

        dispatch(login(safeMemberInfo));

        await Swal.fire({
          title: "로그인 성공",
          text: `${provider.toUpperCase()} 계정으로 로그인되었습니다.`,
          icon: "success",
          confirmButtonText: "확인",
        });

        navigate("/");
      } catch (error) {
        console.error(`${provider} 로그인 실패:`, error);

        await Swal.fire({
          title: "로그인 실패",
          text: `${provider.toUpperCase()} 로그인에 실패했습니다.`,
          icon: "error",
          confirmButtonText: "확인",
        });

        navigate("/login");
      }
    };

    loginWithProvider();
  }, [authCode, provider]);

  return <div>로그인 처리 중입니다...</div>;
};

export default SocialRedirectPage;
