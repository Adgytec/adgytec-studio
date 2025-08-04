import { isNotAuthenticated } from "@/utils/auth/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (await isNotAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      Hello "/_homeLayout"!
      <Outlet />
    </div>
  );
}
