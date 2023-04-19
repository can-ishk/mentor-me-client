import CreateMent from "../components/CreateMent";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import Profile from "../components/ProfileCard";
import SignUp from "./SignUp";
import MultiSelectChip from "../components/util/MultiSelectChips";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import { useState } from "react";

export default function Test() {
    const [value, setValue] = useState("**Hello world!!!**");
    return (
        <div>
            {/* <NavBar/>    */}
            {/* <SignUp/> */}
            {/* <MultiSelectChip items={options}/> */}
            {/* <Footer/> */}
            <MDEditor height={200} value={value} onChange={setValue} />
            {/* <Loading/> */}
            {/* <Profile/> */}
        </div>
    )
}