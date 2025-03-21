import React, { useEffect } from "react";

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  onClick: (e: Event) => void
) => {
  const handleMouseDown = (evt: Event) => {
    if (
      ref.current &&
      !ref.current.contains(evt.target as HTMLElement)
    ) {
      onClick(evt);
    }
  };

  useEffect(() => {
    document.body.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.body.removeEventListener("mousedown", handleMouseDown);
    };
  }, [ref]);
};
