import { useEffect, useRef } from "react";

export function useClickOutside(handleClose) {
  const ref = useRef(null);

  useEffect(() => {
    const onClickListener = (e) => {
      const current = ref.current;
      if (current && !current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", onClickListener);

    return () => {
      document.removeEventListener("mousedown", onClickListener);
    };
  }, [handleClose]);

  return ref;
}
