import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@adgytec/adgytec-web-ui-components/Link/LinkBase";

export const Route = createFileRoute("/_homeLayout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ThemeSwitcher />
      <Link href="/login">Login</Link>
    </div>
  );
}
