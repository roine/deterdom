import * as React from "react";
import { createRoot } from "react-dom/client";
import fc from "fast-check";
import { Deterdom } from "../../src";
import { MaybeWeightedArbitrary } from "fast-check/lib/types/arbitrary/oneof";

type Props = { variant: "error" | "warning" | "success"; text: string };

const style = {
  alert: {
    error: {
      background: "red",
    },
    warning: {
      background: "orange",
    },
    success: {
      background: "green",
    },
  },
};

export default function Alert({ variant, text }: Props) {
  return (
    <div style={style.alert[variant]} className="text-3xl font-bold underline">
      {text}
    </div>
  );
}

const container = document.getElementById("advanced");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <>
    Ola
    <Deterdom
      arbitrary={fc.record({
        variant: fc.oneof<
          MaybeWeightedArbitrary<"success" | "warning" | "error">[]
        >(fc.constant("error"), fc.constant("warning"), fc.constant("success")),
        text: fc.string(),
      })}
      Component={Alert}
    ></Deterdom>
  </>,
);
