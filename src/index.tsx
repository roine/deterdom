import * as React from "react";
import fc from "fast-check";

export const Deterdom = <T,>({
  arbitrary,
  Component,
}: {
  Component: (props: T) => React.ReactElement;
  arbitrary: fc.Arbitrary<T>;
}): React.ReactElement => {
  const [props, setProps] = React.useState<T>();
  const [mySeed, setSeed] = React.useState<number | undefined>(
    fc.sample(fc.nat(), 1)[0],
  );

  React.useEffect(() => {
    const props = fc.sample(arbitrary, { numRuns: 1, seed: mySeed })[0];
    setProps(props);
  }, [mySeed]);

  return (
    <>
      <label htmlFor="dd-seed">
        Change the seed to generate a new properties
      </label>
      <input
        id="dd-seed"
        type="number"
        value={mySeed}
        onChange={(e) => {
          if (!isNaN(e.target.valueAsNumber)) {
            setSeed(e.target.valueAsNumber);
          }
        }}
      />
      <details>
        <summary>
          Properties
          <span className="icon">👇</span>
        </summary>

        <code>
          <pre>
            {JSON.stringify(
              props,
              (key, value) => {
                if (key === "children" && typeof value === "object") {
                  return "ReactElement";
                }
                return value;
              },
              2,
            )}
          </pre>
        </code>
      </details>
      {/*// @ts-ignore*/}
      <Component {...props} />
    </>
  );
};
