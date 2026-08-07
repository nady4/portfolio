import { component$, Slot } from "@builder.io/qwik";
import "../styles/Signal.scss";

type SignalTone = "purple" | "green" | "red" | "ink";

interface SignalProps {
  code?: string;
  tone?: SignalTone;
}

export default component$<SignalProps>(({ code, tone = "purple" }) => {
  return (
    <span class={`signal-label signal-label--${tone}`}>
      <span class="signal-label__mark" aria-hidden="true">
        +
      </span>
      {code ? <span class="signal-label__code">{code} /</span> : null}
      <Slot />
    </span>
  );
});
