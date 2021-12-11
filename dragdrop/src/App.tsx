import React, { FormEvent, useRef, useState } from "react";

const App: React.FC = () => {
  // const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [dragging, setDragging] = useState<number | null>(null);
  const [squareDates, setSquareDatas] = useState<{ color: string }[]>([]);
  const colorBoxRef = useRef<{ color: string }[]>(squareDates);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue !== "") {
      setSquareDatas((prev) => [...prev, { color: inputValue }]);
      setInputValue("");
    } else {
      alert("색을 입력해주세요");
    }
  };
  const handleDrapStart = (idx: number, e: React.DragEvent<HTMLDivElement>) => {
    setDragging(idx);
  };
  const handleDragEnter = (
    idx: number,
    event: React.DragEvent<HTMLDivElement>,
  ) => {
    setSquareDatas((prev) => {
      colorBoxRef.current = prev;
      if (typeof dragging === "number" && idx < dragging)
        return [
          ...prev.slice(0, idx),
          { color: "transparent" },
          ...prev.slice(idx),
        ];
      if (typeof dragging === "number" && idx > dragging)
        return [
          ...prev.slice(0, idx + 1),
          { color: "transparent" },
          ...prev.slice(idx + 1),
        ];
      return prev;
    });
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    setSquareDatas([...colorBoxRef.current]);
  };
  const handledrop = (
    event: React.DragEvent<HTMLDivElement>,
    thisIdx: number,
  ) => {
    let changeColor: { color: string };
    let newSquare: typeof changeColor[];
    if (typeof dragging === "number" && dragging >= thisIdx) {
      changeColor = squareDates[(dragging as number) + 1];
      newSquare = squareDates.filter(
        (_, idx) => idx !== (typeof dragging === "number" ? dragging : 0) + 1,
      );

      newSquare[thisIdx] = changeColor;
      colorBoxRef.current = newSquare;
      setSquareDatas(newSquare);
      setDragging(null);
    } else if (typeof dragging === "number") {
      changeColor = squareDates[dragging as number];
      newSquare = squareDates.filter(
        (_, idx) =>
          idx !== (typeof dragging === "number" ? dragging : 0) &&
          _ !== undefined,
      );
      newSquare[thisIdx] = changeColor;
      if (newSquare.length > colorBoxRef.current.length) {
        newSquare = newSquare.filter((_, idx) => idx !== newSquare.length - 2);
      }
      colorBoxRef.current = newSquare;
      setSquareDatas(newSquare);
      setDragging(null);
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="색을 입력해주세요"
        />
      </form>

      <section style={{ marginTop: "20px" }}>
        {[...squareDates, { color: "transparent" }].map((el, idx) => (
          <div
            draggable
            style={{
              display: "inline-block",
              background: el.color,
              width: "50px",
              height: "50px",
              marginRight: "20px",
            }}
            onDragStart={(e) => handleDrapStart(idx, e)}
            onDragOver={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onDrop={(e) => handledrop(e, idx)}
            // onDragEnd={handleDragEnd}
            onDragEnter={(e) => handleDragEnter(idx, e)}
            onDragLeave={handleDragLeave}
          ></div>
        ))}
      </section>
    </div>
  );
};

export default App;
