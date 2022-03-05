import {
  textField,
  TextFieldVariants,
} from "~/design-system/core/styles/text-field";
import { styled } from "~/stitches.config";

const DEFAULT_TAG = "input";

const TextField = styled(DEFAULT_TAG, textField);
TextField.toString = () => `.${TextField.className}`;

export type { TextFieldVariants };
export { textField, TextField, DEFAULT_TAG };
