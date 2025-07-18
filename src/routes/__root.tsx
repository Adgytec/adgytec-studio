import {
  Outlet,
  createRootRouteWithContext,
  useNavigate,
} from "@tanstack/react-router";

import type { QueryClient } from "@tanstack/react-query";
import { Devtools } from "@/components/Devtools/Devtools";
import { useEffect } from "react";
import { Hub } from "aws-amplify/utils";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    const navigate = useNavigate();

    useEffect(() => {
      const hubListenerCancellation = Hub.listen("auth", ({ payload }) => {
        switch (payload.event) {
          case "signedIn":
          case "signInWithRedirect":
            navigate({ to: "/" });
            break;
          case "tokenRefresh":
            break;
          default:
            navigate({ to: "/login" });
            break;
        }
      });

      return hubListenerCancellation;
    }, []);

    return (
      <>
        <Outlet />
        <Devtools />
      </>
    );
  },
});
