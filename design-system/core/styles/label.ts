import { text } from "~/design-system/core/styles/text";
import { css, VariantProps } from "stitches.config";

export type LabelVariants = VariantProps<typeof label>;

export const label = css(text, {
  display: "inline-block",
  verticalAlign: "middle",
  cursor: "default",
});
