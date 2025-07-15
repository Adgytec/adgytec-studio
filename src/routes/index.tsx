import { OutlinedButton } from "@adgytec/adgytec-web-ui-components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="trial">
      Hello
      <OutlinedButton>hello</OutlinedButton>
    </div>
  );
}
