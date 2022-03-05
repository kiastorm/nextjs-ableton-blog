import { link, LinkVariants } from "~/design-system/core/styles/link";
import { styled } from "~/stitches.config";

const DEFAULT_TAG = "a";
const Link = styled(DEFAULT_TAG, link);
Link.toString = () => `.${Link.className}`;

export type { LinkVariants };
export { link, Link, DEFAULT_TAG };
