import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { temp: string } }
) {
  const { temp } = params;

  // Extract the numeric value and unit from the input
  const match = temp.match(/^(\d+)([cfk])$/i);
  if (!match) {
    return NextResponse.json(
      { error: "Invalid format. Use <number><unit>, e.g., 100c or 212f." },
      { status: 400 }
    );
  }

  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  let celsius = 0,
    fahrenheit = 0,
    kelvin = 0;

  switch (unit) {
    case "c": // Input is Celsius
      celsius = value;
      fahrenheit = (value * 9) / 5 + 32;
      kelvin = value + 273.15;
      break;
    case "f": // Input is Fahrenheit
      celsius = ((value - 32) * 5) / 9;
      fahrenheit = value;
      kelvin = ((value - 32) * 5) / 9 + 273.15;
      break;
    case "k": // Input is Kelvin
      celsius = value - 273.15;
      fahrenheit = ((value - 273.15) * 9) / 5 + 32;
      kelvin = value;
      break;
    default:
      return NextResponse.json(
        {
          error:
            "Invalid unit. Use 'c' for Celsius, 'f' for Fahrenheit, or 'k' for Kelvin.",
        },
        { status: 400 }
      );
  }

  return NextResponse.json({
    celsius: celsius.toFixed(2),
    fahrenheit: fahrenheit.toFixed(2),
    kelvin: kelvin.toFixed(2),
  });
}
