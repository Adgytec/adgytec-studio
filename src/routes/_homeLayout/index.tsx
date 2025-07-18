import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ThemeSwitcher />
    </div>
  );
}
