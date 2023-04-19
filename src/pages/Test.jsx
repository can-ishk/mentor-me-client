import CreateMent from "../components/CreateMent";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import Profile from "../components/ProfileCard";
import SignUp from "./SignUp";
import MultiSelectChip from "../components/util/MultiSelectChips";
import options from "../components/options";

import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';

import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

export default function Test() {
    console.log(options)
    return (
        <div>
            {/* <NavBar/>    */}
            {/* <SignUp/> */}
            {/* <MultiSelectChip items={options}/> */}
            <MdEditor style={{ height: '600px', width:'800px' }} renderHTML={text => mdParser.render(text)} onChange={()=>{
                console.log("change has been handled :P")
            }} />
            {/* <Footer/> */}
            {/* <Loading/> */}
            {/* <Profile/> */}
        </div>
    )
}