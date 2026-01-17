import { CSSProperties } from "react";

export const EmptyData = ({
  image,
  title,
  textSize,
  imageSize,
  customStyles,
}) => {
  return (
    <div
      style={customStyles}
      className="flex flex-col gap-1 items-center justify-center w-full"
    >
      <img
        src={image}
        draggable={false}
        alt="No data icon"
        style={{ width: imageSize, height: imageSize }}
        className="size-40 sm:size-48 aspect-square object-contain"
      />
      <span
        style={{ fontSize: textSize }}
        className="font-semibold text-base sm:text-lg select-none text-center"
      >
        {title}
      </span>
    </div>
  );
};
