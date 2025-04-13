"use client";

import { useState } from "react";

export default function Home() {
  const [inputNum, setInputNum] = useState("100");
  const [unit, setUnit] = useState("celsius");

  const convertTemperature = () => {
    if (inputNum === "") return { celsius: 0, fahrenheit: 0, kelvin: 0 };

    const num = Number(inputNum);
    let celsius = 0,
      fahrenheit = 0,
      kelvin = 0;

    switch (unit) {
      case "celsius":
        celsius = num;
        fahrenheit = (num * 9) / 5 + 32;
        kelvin = num + 273.15;
        break;
      case "fahrenheit":
        celsius = ((num - 32) * 5) / 9;
        fahrenheit = num;
        kelvin = ((num - 32) * 5) / 9 + 273.15;
        break;
      case "kelvin":
        celsius = num - 273.15;
        fahrenheit = ((num - 273.15) * 9) / 5 + 32;
        kelvin = num;
        break;
    }

    return { celsius, fahrenheit, kelvin };
  };

  const temps = convertTemperature();

  return (
    <div className="grid grid-rows-[auto_1fr] gap-8 min-h-screen p-8 pb-20 sm:p-20">
      <div className="space-y-6">
        <fieldset>
          <legend className="mb-3">Select input temperature unit:</legend>
          <div className="space-y-2">
            <div>
              <input
                type="radio"
                id="celsius"
                name="unit"
                value="celsius"
                checked={unit === "celsius"}
                onChange={(e) => setUnit(e.target.value)}
              />
              <label htmlFor="celsius" className="ml-2">
                Celsius
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="fahrenheit"
                name="unit"
                value="fahrenheit"
                checked={unit === "fahrenheit"}
                onChange={(e) => setUnit(e.target.value)}
              />
              <label htmlFor="fahrenheit" className="ml-2">
                Fahrenheit
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="kelvin"
                name="unit"
                value="kelvin"
                checked={unit === "kelvin"}
                onChange={(e) => setUnit(e.target.value)}
              />
              <label htmlFor="kelvin" className="ml-2">
                Kelvin
              </label>
            </div>
          </div>
        </fieldset>
        <input
          type="number"
          value={inputNum}
          onChange={(e) => setInputNum(e.target.value)}
          className="border p-2 rounded"
          placeholder="Enter temperature"
        />
      </div>

      <div className="space-y-2">
        <p>Celsius: {temps.celsius.toFixed(2)}°C</p>
        <p>Fahrenheit: {temps.fahrenheit.toFixed(2)}°F</p>
        <p>Kelvin: {temps.kelvin.toFixed(2)}K</p>
      </div>
    </div>
  );
}
