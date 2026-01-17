import { useClickOutside } from "../../../hooks";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

export const Modal = ({
  title,
  width,
  footer,
  children,
  handleClose,
  type = "default",
}) => {
  const ref = useClickOutside(handleClose);

  return (
    <>
      <div className="fixed inset-0 z-60 flex flex-row items-center justify-center w-full h-screen">
        <div
          ref={ref}
          type={type}
          style={{ width }}
          className={`
            flex flex-col gap-6 shadow-lg rounded-2xl w-[85%] lg:w-2/3 xl:w-1/2 
            ${type === "default" ? "bg-white" : "bg-red-50"}
            `}
        >
          <div
            type={type}
            className="flex flex-row items-center justify-between sm:pt-6 sm:mx-8 border-b border-neutral-200 pb-3"
          >
            {typeof title === "string" ? (
              <span className="text-xl sm:text-2xl font-bold">{title}</span>
            ) : (
              title
            )}
            <div onClick={handleClose} className="cursor-pointer">
              <Icon
                path={mdiClose}
                className="size-5 sm:size-6 text-neutral-400"
              />
            </div>
          </div>
          <div
            className="w-full sm:px-8 overflow-y-auto"
            style={{ flex: "1 1 auto", maxHeight: "calc(100vh - 225px)" }}
          >
            {children}
          </div>
          {footer && (
            <div className="flex flex-row justify-end items-center gap-4 w-full sm:px-8 py-5 border-t border-neutral-200">
              {footer}
            </div>
          )}
        </div>
      </div>
      <div className="fixed inset-0 z-50 bg-black opacity-50" />
    </>
  );
};
