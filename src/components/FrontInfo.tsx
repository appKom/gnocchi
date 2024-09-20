import money from "./money.png"
import money2 from "./money2.png"

export default function FrontInfo() {
    return (<div className="size-full bg-[#282c34]" >
        <div className="relative w-full h-screen">
            <img src={money} alt="" className="money-money object-contain  absolute -right-10"/>
            <div className="flipped right-[55%] absolute w-full">

                <img src={money2} alt="" className="money-money object-contain size-full "/>
            </div>
        </div>
    </div>)
}

