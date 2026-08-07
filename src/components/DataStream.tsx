import { component$ } from "@builder.io/qwik";
import "../styles/DataStream.scss";

const stream = [
  "NADY4",
  "TYPESCRIPT",
  "REACT",
  "NODE.JS",
  "LLM INTEGRATION",
  "AI AGENTS",
  "WORKFLOW AUTOMATION",
  "CLOUDFLARE WORKERS",
  "N4 / 2026",
  "BUENOS AIRES"
];

export default component$(() => {
  return (
    <div class="data-stream" aria-label="Technical archive index">
      <span class="data-stream__label">DATA STREAM / 01</span>
      <div class="data-stream__viewport" aria-hidden="true">
        <div class="data-stream__track">
          {[...stream, ...stream].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item} <b>+</b>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});
