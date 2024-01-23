import React, { useState } from "react";

const Ex = () => {
  const initialRule = { key: 'age', output: { value: '', operator: '>=', score: '' } };
  const [rules, setRules] = useState([initialRule]);
  const [combinator, setCombinator] = useState("and");

  const handleRuleChange = (index, key, value) => {
    const updatedRules = [...rules];
    const field = key.split(".");
    if (field.length === 2) {
      updatedRules[index].output[field[1]] = value;
    } else {
      updatedRules[index][key] = value;
    }

    setRules(updatedRules);
  };

  const handleOperatorChange = (index, value) => {
    handleRuleChange(index, "output.operator", value);
  };  

  const handleCombinatorChange = (value) => {
    setCombinator(value);
  };

  const handleAddRule = () => {
    setRules([...rules, { ...initialRule }]); 
  };

  const handleDeleteRule = (index) => {
    const updatedRules = [...rules];
    updatedRules.splice(index, 1);
    setRules(updatedRules);
  };

  const handleSubmit = () => {
    const output = {
      rules: rules.map((rule) => ({
        key: rule.key,
        output: { ...rule.output },
      })),
      combinator,
    };

    console.log(JSON.stringify(output, null, 2));
  };

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label htmlFor="combinator">Combinator Type</label>
          <select
            className="form-control"
            id="combinator"
            value={combinator}
            onChange={(e) => handleCombinatorChange(e.target.value)}
          >
            <option value="and">AND</option>
            <option value="or">OR</option>
          </select>
        </div>

        {rules.map((rule, index) => (
          <div key={index} className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor={`ruleType-${index}`}>Rule Type</label>
                <select
                  className="form-control"
                  id={`ruleType-${index}`}
                  value={rule.key}
                  onChange={(e) =>
                    handleRuleChange(index, "key", e.target.value)
                  }
                >
                  <option value="age">Age</option>
                  <option value="credit_score">Credit Score</option>
                  <option value="account_balance">Account Balance</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor={`operator-${index}`}>Operator</label>
                <select
                  className="form-control"
                  id={`operator-${index}`}
                  value={rule.output.operator}
                  onChange={(e) => handleOperatorChange(index, e.target.value)}
                >
                  <option value=">">{">"}</option>
                  <option value="<">{"<"}</option>
                  <option value=">=">{">="}</option>
                  <option value="<=">{"<="}</option>
                  <option value="=">={"="}</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor={`value-${index}`}>Value</label>
                <input
                  type="text"
                  className="form-control"
                  id={`value-${index}`}
                  value={rule.output.value}
                  onChange={(e) =>
                    handleRuleChange(index, "output.value", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor={`score-${index}`}>Score</label>
                <input
                  type="text"
                  className="form-control"
                  id={`score-${index}`}
                  value={rule.output.score}
                  onChange={(e) =>
                    handleRuleChange(index, "output.score", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-danger mt-4"
                onClick={() => handleDeleteRule(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-primary mt-2"
          onClick={handleAddRule}
        >
          Add Rule
        </button>

        <button
          type="button"
          className="btn btn-success mx-1 mt-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Ex;
