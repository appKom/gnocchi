import money from "./money.png"
import money2 from "./money2.png"

export default function FrontInfo() {
    return (<div className="size-full bg-[#2E6E53]">
        <div className="relative w-full h-screen">
            <img src={money} alt="" className="money-money object-contain size-full absolute -right-10"/>
            <div className="flipped right-[55%] absolute w-full">

                <img src={money2} alt="" className="money-money object-contain size-full "/>
            </div>
        </div>
        <h1>Velkommen!</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis a dolor ac egestas. 
            Nam malesuada efficitur sodales. Sed interdum at magna et pretium. Etiam hendrerit accumsan tristique. 
            Donec porta accumsan est, non lacinia diam porta vitae. Morbi sed lobortis nunc, vel ornare metus. Mauris suscipit neque sem, sed euismod risus ullamcorper interdum. 
            Curabitur vel magna euismod, ullamcorper odio nec, condimentum purus. Pellentesque molestie condimentum libero, in venenatis leo. Quisque bibendum magna eu ultrices aliquet. Donec quis arcu ac massa suscipit pharetra sit amet sed nisl. Ut in congue quam. Curabitur tincidunt tristique euismod.</p>
    </div>)
}

