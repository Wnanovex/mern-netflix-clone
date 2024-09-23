import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authApiSlice.js";
import { setCredientials } from "../../redux/features/auth/authSlice.js";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredientials({ ...res }));
      navigate("/");
    } catch (error) {
      toast.error(error?.data);
    }
  };

  return (
    <div className="hero-bg h-screen w-full">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-10 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h2 className="text-center font-bold text-2xl text-white mb-4">
            Login
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-md font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-3 py-2 mt-1 text-white border border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-md font-medium text-gray-300 block"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full px-3 py-2 mt-1 text-white border border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full py-2 text-white bg-red-600 font-semibold rounded-md hover:bg-red-700"
            >
              {isLoading ? "Signing in ..." : "Sign In"}
            </button>
          </form>
          <p className="text-center text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
