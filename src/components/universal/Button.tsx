interface Props {
  title: string;
  color: "blue" | "white" | "orange" | "green" | "gray" | "dark green";
  size?: "small";
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  className?: string;
}

const Button = (props: Props) => {
  let colorClasses = "";
  let sizeClasses = "";

  // Determine button size
  if (props.size === "small") {
    sizeClasses = "px-5 py-2.5 text-sm";
  } else {
    sizeClasses = "px-6 py-3";
  }

  // Determine button color
  switch (props.color) {
    case "blue":
      colorClasses = "bg-blue-500 text-white hover:bg-blue-600";
      break;
    case "white":
      colorClasses = "bg-white text-black hover:bg-gray-200";
      break;
    case "orange":
      colorClasses = "bg-orange-500 text-white hover:bg-orange-600";
      break;
    case "green":
      colorClasses = "bg-green-200 text-black hover:bg-green-300";
      break;
    case "gray":
      colorClasses = "bg-gray-500 text-white hover:bg-gray-600";
      break;
    case "dark green":
      colorClasses = "bg-[#2D433A] text-white hover:bg-[#1f3029]"; // Dark green background and hover effect
      break;
    default:
      colorClasses = "bg-white text-black hover:bg-gray-200"; // Default to white if no color is specified
  }

  // Combine classes
  const className = `flex rounded-[15px] items-center justify-center p-2 h-[40px] justify-self-end relative z-20 font-medium text-center transition-all rounded-lg shadow-sm focus:ring focus:ring-primary-200 inline-flex items-center gap-1.5 ${colorClasses} ${sizeClasses} ${
    props.className || ""
  }`;

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
