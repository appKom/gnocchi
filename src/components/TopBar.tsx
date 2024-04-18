import topwave from "./topwave.svg"
import Navbar from "./universal/Navbar"
export default function Topbar() {
    return (<div className="bg-[#282c34]"><Navbar/>
    <img src={topwave} alt=""/>
    </div>)
}