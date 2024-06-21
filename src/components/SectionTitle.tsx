import React from "react";

function SectionTitle({ text, colored }: { text: string; colored?: boolean }) {
  return (
    <h2
      className={`font-bold text-center px-16 py-16 md:py-24 ${
        colored ? "text-success" : "text-black"
      }`}
    >
      {text}
    </h2>
  );
}

export default SectionTitle;
