import {
  container,
  ContainerVariants,
} from "~/design-system/core/styles/container";
import { styled } from "~/stitches.config";

const DEFAULT_TAG = "div";
const Container = styled(DEFAULT_TAG, container);
Container.toString = () => `.${Container.className}`;

export type { ContainerVariants };
export { container, Container, DEFAULT_TAG };
