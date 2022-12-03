import { useState } from "react";

function App() {
  const [currentValue, setCurrentValue] = useState("0");
  const [currentSign, setCurrentSign] = useState("");
  const [formula, setFormula] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const handleClick = (e) => {
    let lastElement;
    if (e.target.className === "options") return;
    switch (e.target.id) {
      case "clear":
        setCurrentValue("0");
        setEvaluated(false);
        setFormula("");
        break;
      case "add":
      case "subtract":
      case "multiply":
      case "divide":
        if (currentValue === "0" && currentSign === "") return; //Prevents Sign on zero
        setCurrentValue("0");
        setEvaluated(false);
        if (formula.includes("="))
          setFormula(formula.slice(formula.indexOf("=") + 1));
        if (currentSign !== "") {
          const newFormula =
            formula.slice(0, formula.length - 1) + e.target.innerText;
          setCurrentSign(e.target.innerText);
          setFormula(newFormula);
        } else {
          setCurrentSign(e.target.innerText);
          setFormula((prevFormula) => prevFormula + e.target.innerText);
        }
        break;
      case "equals":
        lastElement = formula[formula.length - 1];
        if (!Boolean(parseFloat(lastElement))) return;
        const result = eval(`${formula}`);
        setCurrentValue(result.toString());
        setFormula((prevFormula) => prevFormula + "=" + result);
        setCurrentSign("");
        setEvaluated(true);
        break;
      default:
        setCurrentSign("");
        //Remove Zero when typing first digit
        if (currentValue === "0" && e.target.innerText !== ".") {
          setCurrentValue(e.target.innerText);
          setFormula((prevFormula) => prevFormula + e.target.innerText);
          return;
        }
        //Remove previous result on new digit entry
        if (evaluated && e.target.innerText !== ".") {
          setCurrentValue(e.target.innerText);
          setFormula(e.target.innerText);
          setEvaluated(false);
          return;
        }
        //Stop if already added a decimal
        if (e.target.innerText === "." && currentValue.includes(".")) return;
        //General Calculation
        setCurrentValue(
          (prevCurrentValue) => prevCurrentValue + e.target.innerText
        );
        setFormula((prevFormula) => prevFormula + e.target.innerText);
        setEvaluated(false);
        break;
    }
  };

  return (
    <div className="app">
      <p id="formula">{formula}</p>
      <div id="display">{currentValue}</div>
      <div className="options" onClick={handleClick}>
        <button id="clear">AC</button>
        <button id="divide">/</button>
        <button id="multiply">*</button>
        <button id="seven">7</button>
        <button id="eight">8</button>
        <button id="nine">9</button>
        <button id="subtract">-</button>
        <button id="four">4</button>
        <button id="five">5</button>
        <button id="six">6</button>
        <button id="add">+</button>
        <button id="one">1</button>
        <button id="two">2</button>
        <button id="three">3</button>
        <button id="equals">=</button>
        <button id="zero">0</button>
        <button id="decimal">.</button>
      </div>
    </div>
  );
}

export default App;
