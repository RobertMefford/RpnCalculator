const RpnOperators = require("./RpnOperators");

class RpnCalculator {
  constructor() {
    this.mOperands = [];
  }

  //check if ch is an available operator
  _isOperator(ch) {
    return Object.keys(RpnOperators).includes(ch);
  }

  //check if num can be a number.
  _isOperand(num) {
    return /^-?\d+(?:[.]\d*?)?$/.test(num);
  }

  //check if input line is valid or invalid input
  _isValidateParams(params) {
    const isValid = params.reduce(
      (isValid, param) =>
        isValid & (this._isOperand(param) || this._isOperator(param)),
      true
    );

    if (!isValid) throw Error("Input is not valid!");
  }

  /**
   * do calculation with operator and rpnStack(operands array)
   * take enough operands from right of rpnStack and operate between operands
   * return new operands
   **/
  _operate(operator, rpnStack) {
    const numberOfOperands = rpnStack.length;
    const numberOfParams = RpnOperators[operator].numberOfParams;

    //return an error if there are no enough operands
    if (numberOfOperands < numberOfParams) {
      throw Error("There aren't enough operands.");
    }

    //get enough operands from right of rpnStack.
    const params = rpnStack.splice(
      numberOfOperands - numberOfParams,
      numberOfParams
    );
    const rlt = RpnOperators[operator].operate(...params);

    //check if result is infinite (eg: divid by 0)
    if (!isFinite(rlt)) throw Error("Infinite Error: not valid operation");

    return [...rpnStack, rlt];
  }

  clear() {
    this.mOperands = [];
  }

  evaluate(line) {
    const params = line.split(" ");
    this._isValidateParams(params);

    this.mOperands = params.reduce(
      (operands, param) => {
        //push a new operand.
        if (this._isOperand(param)) return [...operands, parseFloat(param)];

        try {
          operands = this._operate(param, operands);
          return operands;
        } catch (error) {
          throw error;
        }
      },
      [...this.mOperands]
    );

    return this.mOperands.at(-1);
  }
}

module.exports = RpnCalculator;
