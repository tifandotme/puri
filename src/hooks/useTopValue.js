import { useState, useEffect } from "react";
import { useBreakpointValue } from "@chakra-ui/react";

/**
 * This hook is used to determine the top value for the header based on
 * the scroll position and the breakpoint value. It is used to hide
 * the header when the user is scrolling down.
 *
 * Make sure to have header position set to fixed and transition set to top
 *
 * @param {number} headerHeight - The height of the header
 * @param {string} breakpoint - The breakpoint value (e.g. "sm", "md", "lg")
 *
 * @returns {number} The top value for the header
 */
function useTopValue(headerHeight, breakpoint) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 60);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const topValue = useBreakpointValue({
    base: !visible ? headerHeight * -1 : 0,
    [breakpoint]: 0,
  });

  if (topValue === undefined) {
    return 0;
  }
  return topValue;
}

export default useTopValue;
