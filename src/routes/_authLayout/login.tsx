import { createFileRoute } from "@tanstack/react-router";
import { LoginCard } from "./-components/LoginCard/LoginCard";

export const Route = createFileRoute("/_authLayout/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginCard />;
}
