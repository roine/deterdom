import * as React from "react";
import { createRoot } from "react-dom/client";
import fc from "fast-check";
import { Deterdom } from "../../src";

type Props = { name: string; description: string };

export default function App({ name, description }: Props) {
  return (
    <div className="App">
      <h1>Hello {name}</h1>
      <p>{description}</p>
    </div>
  );
}

const container = document.getElementById("simple");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <>
    <Deterdom
      arbitrary={fc.record({
        name: fc.oneof(
          { arbitrary: fc.constant("Jon"), weight: 2 },
          fc.constant("Steve"),
          fc.constant("Erik"),
          fc.constant("Jeff"),
          fc.constant("Scott"),
        ),
        description: fc.lorem({ mode: "sentences", size: "medium" }),
      })}
      Component={App}
    ></Deterdom>
  </>,
);
