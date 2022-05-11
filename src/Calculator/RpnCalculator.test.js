const RpnCalculator = require("./RpnCalculator");

const mCalculator = new RpnCalculator();

describe("Testing with errors", () => {
  test("Input: Throw an error when input is not valid.", (done) => {
    expect(() => mCalculator.evaluate("3.3 @")).toThrowError(
      Error("Input is not valid!")
    );

    expect(() => mCalculator.evaluate("asd")).toThrowError(
      Error("Input is not valid!")
    );

    expect(() => mCalculator.evaluate("31s +")).toThrowError(
      Error("Input is not valid!")
    );
    done();
  });

  test("Operate: Throw an error when there aren't enough operands", (done) => {
    expect(() => mCalculator.evaluate("3 +")).toThrowError(
      Error("There aren't enough operands.")
    );
    done();
  });

  test("Operate: Throw an error when operation is not valid", (done) => {
    expect(() => mCalculator.evaluate("1 0 /")).toThrowError(
      Error("Infinite Error: not valid operation")
    );
    done();
  });
});

describe("Testing with success", () => {
  test("evaluate function with multiple line inputs", (done) => {
    expect(mCalculator.evaluate("1 2 +")).toStrictEqual(3);
    expect(mCalculator.evaluate("3")).toStrictEqual(3);
    expect(mCalculator.evaluate("+")).toStrictEqual(6);
    expect(mCalculator.evaluate("6 *")).toStrictEqual(36);
    mCalculator.clear();
    expect(mCalculator.evaluate("3 5 + 6 * 5 3 - 4 / +")).toStrictEqual(
      (3 + 5) * 6 + (5 - 3) / 4
    );
    done();
  });
});
