import * as React from "react";
import { useCMS } from "tinacms";

// <ExitButton /> is assumed to be nested inside of the <TinaProvider> context
export default function ExitButton() {
  const cms = useCMS();

  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? `Exit Tina` : `Edit with Tina`}
    </button>
  );
}
