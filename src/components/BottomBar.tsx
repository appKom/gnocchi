import wave from "./wave.svg"
export default function BottomBar() {
    return (<div className="bg-transparent w-screen absolute md:-bottom-20 ph:bottom-1/2 ph:z-20">
    <img src={wave} alt=""/>
    </div>)
}