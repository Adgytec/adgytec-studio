import { isAuthenticated } from "@/utils/auth/auth";
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
  return <Outlet />;
}
