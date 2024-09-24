import { LogOut, Menu, Search } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutApiCallMutation } from "../redux/api/authApiSlice";
import { logout } from "../redux/features/auth/authSlice";
import { changeContentType } from "../redux/features/contentType/contentTypeSlice";

export default function Navbar() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutApiCallMutation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap(); // use logoutApiCall with
      dispatch(logout()); // use dispatch of logout
      navigate("/login"); // navigate to login page
    } catch (error) {
      console.error(error); // console error
    }
  };

  const handleChangeContentType = (contentType) => {
    dispatch(changeContentType(contentType)); // use dispatch of logout
    console.log(contentType);
  };

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img
            src="/netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
          />
        </Link>
        {/* desktop navbar items */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link
            to="/"
            className="hover:underline"
            onClick={() => handleChangeContentType("Movies")}
          >
            Movies
          </Link>
          <Link
            to="/"
            className="hover:underline"
            onClick={() => handleChangeContentType("TV Shows")}
          >
            TV Shows
          </Link>
          <Link to="/history" className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to="/search">
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={userInfo.image}
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={handleLogout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* mobile navbar items */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black rounded border border-gray-800">
          <Link
            to="/"
            className="block hover:underline p-2"
            onClick={() => { handleChangeContentType("Movies"); toggleMobileMenu()}}
          >
            Movies
          </Link>
          <Link
            to="/"
            className="block hover:underline p-2"
            onClick={() => {handleChangeContentType("TV Shows"); toggleMobileMenu()}}
          >
            TV Shows
          </Link>
          <Link
            to="/history"
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
}
