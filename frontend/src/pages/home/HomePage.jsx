import { useSelector } from "react-redux";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

export default function HomePage() {
  const { userInfo } = useSelector((state) => state.auth);

  return <div>{userInfo ? <HomeScreen /> : <AuthScreen />}</div>;
}
