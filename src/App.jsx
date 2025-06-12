import "./styles/theme.css";
import "./styles/global.css";
import { MyGrid } from "./components/MyGrid";
import { CircleUserRound } from "lucide-react";

export default function App() {

  return (
    //React Fragment
    <>
      <MyGrid />
      <CircleUserRound />
    </>
  );
}
