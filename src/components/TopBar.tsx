import topwave from "./topwave.svg"
import Navbar from "./universal/Navbar"
export default function Topbar() {
    return (<div className="bg-transparent w-screen fixed z-10 ph:top-12">
    <img src={topwave} alt=""/>
    </div>)
}