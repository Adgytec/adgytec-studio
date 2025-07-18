import { isAuthenticated } from "@/utils/auth/session";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authLayout")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (await isAuthenticated()) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      Hello "/_authLayout"!
      <Outlet />
    </div>
  );
}
