import CreateMent from "../components/CreateMent";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import Profile from "../components/ProfileCard";
import SignUp from "./SignUp";
import MultiSelectChip from "../components/util/MultiSelectChips";
import MarkdownEditor from "../components/MarkdownEditor";
import { useState } from "react";
export default function Test() {
    const [content, setContent] = useState("")
    return (
        <div>
            {/* <NavBar/>    */}
            {/* <SignUp/> */}
            {/* <MultiSelectChip items={options}/> */}
            <MarkdownEditor value={content} setValue={setContent} />
            {/* <Footer/> */}
            {/* <Loading/> */}
            {/* <Profile/> */}
        </div>
    )
}