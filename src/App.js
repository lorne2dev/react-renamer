import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const initialList = [
    { id: 10, name: "dog" },
    { id: 11, name: "cat" },
    { id: 12, name: "mouse" },
    { id: 13, name: "rabbit" },
    { id: 14, name: "bird" },
  ];
  const [data, setData] = useState(initialList);
  const [inputValue, setInputValue] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = new Array(data.length);
  }, [data]);

  const updateNameHandler = (id, index) => {
    if (inputValue) {
      const items = [...data];
      items[index] = { id, name: inputValue };
      setData(items);
    }
    inputRefs.current[index].value = "";
  };

  const inputValueHandler = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <h1>Renamer</h1>
      {data.map((val, index) => (
        <div key={val.id}>
          <h2>{val.name}</h2>
          <input
            type="text"
            name="name"
            autoComplete="off"
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={inputValueHandler}
          />
          <button
            onClick={() => {
              updateNameHandler(val.id, index);
            }}
          >
            update
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
