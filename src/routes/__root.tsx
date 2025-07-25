import {
  Outlet,
  createRootRouteWithContext,
  useNavigate,
  useRouter,
  type ToPathOption,
  type RegisteredRouter,
  type NavigateOptions,
} from "@tanstack/react-router";

import type { QueryClient } from "@tanstack/react-query";
import { Devtools } from "@/components/Devtools/Devtools";
import { useEffect } from "react";
import { Hub } from "aws-amplify/utils";
import { RouterProvider } from "react-aria-components";
import { VisualSettings } from "@/components/VisualSettings/VisualSettings";

interface MyRouterContext {
  queryClient: QueryClient;
}

// https://stackblitz.com/edit/tanstack-router-hhpjdc?file=src%2Froutes%2F__root.tsx&preset=node
// used this for react-aria-components usage with tanstack-router
declare module "react-aria-components" {
  interface RouterConfig {
    href: ToPathOption<RegisteredRouter, "/", "/"> | (string & {});
    routerOptions: Omit<NavigateOptions, "to" | "from">;
  }
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    const navigate = useNavigate();
    const router = useRouter();

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
      <RouterProvider
        navigate={(to, options) =>
          router.navigate({
            ...options,
            to: to as ToPathOption<RegisteredRouter, "/", "/">,
          })
        }
        useHref={(to) => buildHref(to, router)}
      >
        <VisualSettings ui={false} />
        <Outlet />
        <Devtools />
      </RouterProvider>
    );
  },
});

// https://github.com/adobe/react-spectrum/issues/6397#issuecomment-2473017479
// refrenced this for external url
const ABSOLUTE_URL_PREFIXES = [
  "https://",
  "http://",
  "mailto:",
  "tel:",
] as const;

function buildHref(
  to: ToPathOption<RegisteredRouter, "/", "/"> | (string & {}),
  router: RegisteredRouter,
): string {
  if (!to) return "";

  if (ABSOLUTE_URL_PREFIXES.some((prefix) => to.startsWith(prefix))) {
    return to;
  }

  return router.buildLocation({ to }).href;
}
