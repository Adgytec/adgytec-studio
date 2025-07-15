// src/components/Devtools.tsx
import { useEffect, useState, type JSX } from "react";

export function Devtools() {
  const [DevtoolsComponents, setDevtoolsComponents] =
    useState<JSX.Element | null>(null);

  useEffect(() => {
    if (import.meta.env.DEV) {
      // Dynamically import both devtools
      Promise.all([
        import("@tanstack/react-router-devtools").then(
          (mod) => mod.TanStackRouterDevtools,
        ),
        import("../../integrations/tanstack-query/layout.tsx").then(
          (mod) => mod.default,
        ),
      ]).then(([RouterDevtools, QueryLayout]) => {
        setDevtoolsComponents(
          <>
            <RouterDevtools />
            <QueryLayout />
          </>,
        );
      });
    }
  }, []);

  return DevtoolsComponents;
}
