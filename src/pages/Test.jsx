import CreateMent from "../components/CreateMent";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import Profile from "../components/ProfileCard";
import SignUp from "./SignUp";
import MultiSelectChip from "../components/util/MultiSelectChips";
import options from "../data/options.js";

export default function Test() {
    console.log(options)
    return (
        <div>
            {/* <NavBar/>    */}
            {/* <SignUp/> */}
            <MultiSelectChip items={options}/>
            {/* <Footer/> */}
            {/* <Loading/> */}
            {/* <Profile/> */}
        </div>
    )
}