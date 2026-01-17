import Icon from "@mdi/react";

export const CustomButton = ({
  icon,
  children,
  isDisabled,
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
        flex items-center gap-1 rounded-xl px-4 py-2 text-sm transition-all shadow-sm whitespace-nowrap
        ${variants[variant] || variants.primary}
        ${
          isDisabled === true
            ? "cursor-not-allowed bg-neutral-200"
            : "cursor-pointer hover:shadow-md"
        }
      `}
    >
      {icon && <Icon path={icon} className="size-4" />}
      {children}
    </button>
  );
};
