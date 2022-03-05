import { __DEV__ } from "~/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import * as React from "react";
import { CSS, keyframes, styled } from "~/stitches.config";

const spin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

interface SpinnerOptions {
  /**
   * The color of the empty area in the spinner
   */
  emptyColor?: string;
  /**
   * The color of the spinner
   */
  color?: string;
  /**
   * The thickness of the spinner
   * @example
   * ```jsx
   * <Spinner thickness="4px"/>
   * ```
   */
  thickness?: string;
  /**
   * The speed of the spinner.
   * @example
   * ```jsx
   * <Spinner speed="0.2s"/>
   * ```
   */
  speed?: string;
  /**
   * For accessibility, it is important to add a fallback loading text.
   * This text will be visible to screen readers.
   */
  label?: string;
}

const StyledSpinner = styled("div", {
  display: "inline-block",
  borderColor: "currentColor",
  borderStyle: "solid",
  borderRadius: "99999px",
  borderWidth: "2px",
  borderBottomColor: "transparent",
  borderLeftColor: "transparent",
  animation: `${spin} .45s linear infinite`,
  width: ".9rem",
  height: ".9rem",
});

export interface SpinnerProps
  extends Omit<React.ComponentPropsWithRef<"div">, keyof SpinnerOptions>,
    SpinnerOptions {
  css?: CSS;
}

export const Spinner = React.forwardRef<React.ElementRef<"div">, SpinnerProps>(
  (props, ref) => {
    const { label = "Loading...", ...rest } = props;
    return (
      <StyledSpinner ref={ref} {...rest}>
        {label && <VisuallyHidden>{label}</VisuallyHidden>}
      </StyledSpinner>
    );
  }
);

if (__DEV__) {
  Spinner.displayName = "Spinner";
}
