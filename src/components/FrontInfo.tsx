import money from "./money.png"
import money2 from "./money2.png"
import moneyCopy from "./money copy.png"
import moneyCopy2 from "./money2 copy.png"

export default function FrontInfo() {
    return (<div className=" bg-[#282c34] w-full md:h-screen ph:h-1/2 ph:my-0 ph:py-0" >
            <div className="text-center text-white absolute w-[100%] sm:top-[50%] ph:top-[20%] font-bold lg:text-4xl md:text-2xl sm:text-xl ph:text-l">
                <span className="block">Det er ikke hvor mye penger du tjener,</span>
                <span className="block">men hvor mye du beholder.</span>
            </div>
            <img src={moneyCopy} alt="" className="money-money object-contain  lg:w-[500px] md:w-[300px] xs:w-[200px] ph:w-[100px] h-auto absolute right-0 overflow-hidden top-[30%] hidden md:block"/>
            
            <div className="flipped  absolute top-[30%] left-0 hidden md:block ">

                <img src={moneyCopy2} alt="" className="money-money object-contain  lg:w-[500px] md:w-[300px] xs:w-[200px] ph:w-[100px] h-auto left-0"/>
            </div>
    </div>)
}

