import { Navigate, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import SignupPage from "./pages/auth/SignupPage"
import LoginPage from "./pages/auth/LoginPage"
import HomePage from "./pages/home/HomePage"
import WatchPage from "./pages/WatchPage"
import SearchPage from "./pages/SearchPage"
import SearchHistory from "./pages/SearchHistory"
import NotFoundPage from "./pages/NotFoundPage"
import { useSelector } from "react-redux"

function App() {

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/watch/:id" element={userInfo ? <WatchPage /> : <Navigate to={'/login'} />} />
      <Route path="/search" element={userInfo ? <SearchPage /> : <Navigate to={'/login'} />} />
      <Route path="/history" element={userInfo ? <SearchHistory /> : <Navigate to={'/login'} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
      <Toaster />
      <Footer />
    </>
  )
}

export default App
