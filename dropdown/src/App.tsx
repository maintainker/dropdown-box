import React, { FormEvent, useRef, useState } from "react";

const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const [squareDates, setSquareDatas] = useState<{ color: string }[]>([]);
  const colorBoxRef = useRef<{ color: string }[]>(squareDates);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(inputRef.current?.value);
    if (inputRef.current?.value !== "") {
      setSquareDatas((prev) => [
        ...prev,
        { color: inputRef.current?.value || "black" },
      ]);
    } else {
      alert("색을 입력해주세요");
    }
  };
  const handleDrapStart = (idx: number, e: React.DragEvent<HTMLDivElement>) => {
    console.log(e);
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
          prev[dragging],
          ...prev.slice(idx, dragging),
          { color: "transparent" },
          ...prev.slice(dragging + 1),
        ];
      return prev;
    });
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    setSquareDatas([...colorBoxRef.current]);
  };
  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    // setSquareDatas([...colorBoxRef.current]);
    const newSquare = squareDates.filter(
      (_, idx) => idx !== (typeof dragging === "number" ? dragging : 0) + 1,
    );
    console.log(squareDates);
    console.log(newSquare);
    colorBoxRef.current = newSquare;
    setSquareDatas(newSquare);
    setDragging(null);
  };
  console.log(dragging);
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} placeholder="색을 입력해주세요" />
      </form>

      <section style={{ marginTop: "20px" }}>
        {squareDates.map((el, idx) => (
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
            onDragEnd={handleDragEnd}
            onDragEnter={(e) => handleDragEnter(idx, e)}
            onDragLeave={handleDragLeave}
          ></div>
        ))}
      </section>
    </div>
  );
};

export default App;
