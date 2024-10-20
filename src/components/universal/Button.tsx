// Stjålet rett fra opptaksiden shoutout

interface Props {
  title: string;
  color: "blue" | "white" | "orange" | "green";
  size?: "small";
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
}

const Button = (props: Props) => {
  let sizeClasses = "";

  const colorClassesMap = {
    green: "bg-green-950 text-white",
    blue: "bg-blue-300",
    orange: "bg-orange-300",
    white: "bg-white text-black",
  };
  
  // Use the `props.color` to dynamically get the class, with a fallback if needed.
  const colorClasses = colorClassesMap[props.color] || "";

  if (props.size === "small") {
    sizeClasses = "px-5 py-2.5 text-sm";
  } else {
    sizeClasses = "px-6 py-3";
  }

  const className = `flex rounded-[15px] items-center justify-center relativ p-2  h-[40px] bg-white justify-self-end relative z-20 font-medium text-center justify-center transition-all rounded-lg shadow-sm focus:ring focus:ring-primary-200 inline-flex items-center gap-1.5 ${colorClasses} ${sizeClasses}`;
  
  if (props.href) {
    return (
        <a href={props.href} className={className}>
          {props.title}
          {props.icon}
        </a>
    );
  }

  return (
    <button type="button" onClick={props.onClick} className={className}>
      {props.title}
      {props.icon}
    </button>
  );
};

export default Button;