import { useState, useEffect } from "react";
import { useBreakpointValue } from "@chakra-ui/react";

/**
 * Determine the top value for the header based on scroll position and
 * breakpoint value. It is used to dynamically hide the header
 * when the user is scrolling down.
 *
 * Make sure to have header position set to fixed and transition set to top
 *
 * @param headerHeight - The height of the header
 * @param breakpoint - The breakpoint value (e.g. "sm", "md", "lg")
 *
 * @returns - The top value for the header
 */
function useTopValue(headerHeight: number, breakpoint: string): number {
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
  } else {
    return topValue;
  }
}

export default useTopValue;
