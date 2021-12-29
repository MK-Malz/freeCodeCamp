const calcButtons = [
  { buttonId: "add", value: "+" },
  { buttonId: "subtract", value: "-" },
  { buttonId: "multiply", value: "*" },
  { buttonId: "divide", value: "/" },
  { buttonId: "one", value: "1" },
  { buttonId: "two", value: "2" },
  { buttonId: "three", value: "3" },
  { buttonId: "decimal", value: "." },
  { buttonId: "four", value: "4" },
  { buttonId: "five", value: "5" },
  { buttonId: "six", value: "6" },
  { buttonId: "equals", value: "=" },
  { buttonId: "seven", value: "7" },
  { buttonId: "eight", value: "8" },
  { buttonId: "nine", value: "9" },
  { buttonId: "clear", value: "AC" },
  { buttonId: "zero", value: "0" },
];

class DisplayCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      expression: "",
      lastInput: "",
    };
    this.clickButton = this.clickButton.bind(this);
  }

  clickButton(event) {
    if (event.target.value == "AC") {
      this.setState({ input: "0", expression: "", lastInput: "" });
    } else if (
      this.state.lastInput == "=" &&
      (event.target.value == "+" ||
        event.target.value == "-" ||
        event.target.value == "*" ||
        event.target.value == "/")
    ) {
      //Pressing an operator immediately following = should start a new calculation that operates on the result of the previous evaluation.
      this.setState({
        input: event.target.value,
        expression:
          this.state.expression.substring(
            this.state.expression.indexOf("=") + 1
          ) + event.target.value,
        lastInput: event.target.value,
      });
    } else if (event.target.value == "=") {
      this.setState({
        input: eval(this.state.expression),
        expression: this.state.expression + "=" + eval(this.state.expression),
        lastInput: event.target.value,
      });
    } else {
      if (
        (event.target.value == "0" && this.state.lastInput == "0") ||
        (event.target.value == "." && this.state.input.includes("."))
      ) {
        //do nothing
        //When inputting numbers, my calculator should not allow a number to begin with multiple zeros.
        //two . in one number should not be accepted.
      } else if (event.target.value == "-" && this.state.lastInput == "-") {
        this.setState({
          input: event.target.value,
          expression: (this.state.expression + event.target.value).replace(
            /--/,
            "+"
          ),
          lastInput: event.target.value,
        });
      } else if (
        (event.target.value == "+" ||
          event.target.value == "*" ||
          event.target.value == "/") &&
        (this.state.lastInput == "+" ||
          this.state.lastInput == "-" ||
          this.state.lastInput == "*" ||
          this.state.lastInput == "/")
      ) {
        //if 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign).
        let pattern = /[*\/+]-[*\/+]/;
        if (pattern.test(this.state.expression + event.target.value)) {
          this.setState({
            input: event.target.value,
            expression: (this.state.expression + event.target.value).replace(
              /[*\/+]-[*\/+]/,
              event.target.value
            ),
            lastInput: event.target.value,
          });
        } else {
          this.setState({
            input: event.target.value,
            expression: this.state.expression.slice(0, -1) + event.target.value,
            lastInput: event.target.value,
          });
        }
      } else if (
        (this.state.lastInput == "1" ||
          this.state.lastInput == "2" ||
          this.state.lastInput == "3" ||
          this.state.lastInput == "4" ||
          this.state.lastInput == "5" ||
          this.state.lastInput == "6" ||
          this.state.lastInput == "7" ||
          this.state.lastInput == "8" ||
          this.state.lastInput == "9" ||
          this.state.lastInput == "0" ||
          this.state.lastInput == ".") &&
        (event.target.value == "1" ||
          event.target.value == "2" ||
          event.target.value == "3" ||
          event.target.value == "4" ||
          event.target.value == "5" ||
          event.target.value == "6" ||
          event.target.value == "7" ||
          event.target.value == "8" ||
          event.target.value == "9" ||
          event.target.value == "0" ||
          event.target.value == ".")
      ) {
        this.setState({
          input: this.state.input + event.target.value,
          expression: this.state.expression + event.target.value,
          lastInput: event.target.value,
        });
      } else
        this.setState({
          input: event.target.value,
          expression: this.state.expression + event.target.value,
          lastInput: event.target.value,
        });

      //TODO:
      //check for double - sign
    }
  }

  render() {
    return (
      <div>
        <h1> JavaScript Calculator</h1>
        <div className="wrapper">
          <p id="expression">&nbsp;{this.state.expression}</p> <br />
          <p id="display">{this.state.input}</p> <br />
          <div className="buttonBox">
            {calcButtons.map((x) => (
              <button
                id={x.buttonId}
                value={x.value}
                onClick={this.clickButton}
              >
                {x.value}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<DisplayCalculator />, document.getElementById("app"));
