import money1 from "../../resources/frontpage/money1.png";
import money2 from "../../resources/frontpage/money2.png";

export default function FrontInfo() {
  return (
    <div className=" bg-[#282c34] w-full h-screen">
      <div className="text-center text-white absolute w-[100%] top-[50%] font-bold text-4xl">
        <span className="block">Det er ikke hvor mye penger du tjener,</span>
        <span className="block">men hvor mye du beholder.</span>
      </div>
      <img
        src={money1}
        alt=""
        className="money-money object-contain  w-[500px] h-auto absolute right-0 overflow-hidden top-[30%] hidden lg:block"
      />

      <div className="flipped  absolute top-[20%] left-0 hidden lg:block">
        <img
          src={money2}
          alt=""
          className="money-money object-contain  w-[500px] h-auto left-0"
        />
      </div>
    </div>
  );
}
