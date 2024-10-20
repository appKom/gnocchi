import money from "./money.png"
import money2 from "./money2.png"
import moneyCopy from "./money copy.png"
import moneyCopy2 from "./money2 copy.png"

export default function FrontInfo() {
    return (<div className=" bg-[#282c34] w-full h-screen" >
            <div className="text-center text-white absolute w-[100%] top-[50%] font-bold text-4xl">
                <span className="block">Det er ikke hvor mye penger du tjener,</span>
                <span className="block">men hvor mye du beholder.</span>
            </div>
            <img src={moneyCopy} alt="" className="money-money object-contain  w-[500px] h-auto absolute right-0 overflow-hidden top-[30%]"/>
            
            <div className="flipped  absolute top-[20%] left-0 ">

                <img src={moneyCopy2} alt="" className="money-money object-contain  w-[500px] h-auto left-0"/>
            </div>
    </div>)
}

