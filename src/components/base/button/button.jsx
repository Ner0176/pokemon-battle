import Icon from "@mdi/react";

export const CustomButton = ({
  icon,
  children,
  color = {},
  handleClick,
  customStyles = {},
  variant = "primary",
}) => {
  const { bgColor, textColor } = color;

  const variants = {
    primary: "bg-emerald-500 text-white border-transparent",
    secondary: "bg-white text-emerald-500 border border-emerald-500",
  };

  return (
    <button
      onClick={handleClick}
      style={{
        ...customStyles,
        ...(textColor && { color: textColor }),
        ...(bgColor && { backgroundColor: bgColor }),
      }}
      className={`
        flex items-center gap-1 rounded-xl px-4 py-2 text-sm cursor-pointer transition-all shadow-sm hover:shadow-md whitespace-nowrap
        ${variants[variant] || variants.primary} 
      `}
    >
      {icon && <Icon path={icon} className="size-4" />}
      {children}
    </button>
  );
};
