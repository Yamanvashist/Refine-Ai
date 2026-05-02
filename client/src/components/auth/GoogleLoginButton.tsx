import { GoogleLogin } from "@react-oauth/google";
import { api } from "../../api/api";
import useAuthStore from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const { setUser } = useAuthStore();

  const navigate = useNavigate()

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const res = await api.post("/user/auth/google", {
            token: credentialResponse.credential,
          });

          setUser(res.data.user);
          navigate("/")
        } catch (err) {
          console.log(err);
        }
      }}
      onError={() => {
        console.log("Google Login Failed");
      }}
    />
  );
};

export default GoogleLoginButton;