export const CustomButton = ({
  children,
  color = {},
  handleClick,
  customStyles = {},
}) => {
  const { bgColor, textColor } = color;

  return (
    <button
      onClick={handleClick}
      style={{
        ...customStyles,
        ...(textColor && { color: textColor }),
        ...(bgColor && { backgroundColor: bgColor }),
      }}
      className="flex items-center bg-emerald-500 text-white rounded-xl px-4 py-2 text-sm cursor-pointer hover:shadow-md"
    >
      {children}
    </button>
  );
};
