import { useState } from "react";


export default function BgSwicher() {
  const [color, setColor] = useState("green");
  const colors = ["red", "yellow", "black", "skyblue", "green", "lightcoral", "tomato", "blue"];

  function colorChange(color) {
    setColor(color)
  }


  return (
    <>
      <div className="min-h-screen p-6" style={{ backgroundColor: color }}>
        <div className="max-w-[1320px] mx-auto rounded-2xl p-6 text-white">
          <div className="flex justify-center flex-wrap">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => colorChange(color)}
                style={{ backgroundColor: color }}
                className="px-5 py-2 m-2 rounded-lg bg-white text-white min-w-[130px] border shadow-xl cursor-pointer"
              >
                {color.toLocaleUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
