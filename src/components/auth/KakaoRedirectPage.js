import React, { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { login } from "../../redux/loginSlice";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authCode = searchParams.get("code");
  const isCalledRef = useRef(false);

  useEffect(() => {
    if (!authCode || isCalledRef.current) return;
    isCalledRef.current = true;

    const loginWithKakao = async () => {
      try {
        const accessToken = await getAccessToken(authCode);
        console.log("accessToken: ", accessToken);

        const memberInfo = await getMemberWithAccessToken(accessToken);
        console.log("memberInfo: ", memberInfo);

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
          text: "카카오 계정으로 로그인되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
        });

        navigate("/");
      } catch (error) {
        console.error("카카오 로그인 실패:", error);

        await Swal.fire({
          title: "로그인 실패",
          text: "카카오 로그인에 실패했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });

        navigate("/login");
      }
    };

    loginWithKakao();
  }, [authCode]);

  return <div></div>;
};

export default KakaoRedirectPage;
