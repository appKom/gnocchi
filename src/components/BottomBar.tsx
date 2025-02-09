import wave from "./wave.svg";
export default function BottomBar() {
  return (
    <div className="bg-transparent w-screen absolute -bottom-20">
      <img src={wave} alt="" />
    </div>
  );
}
