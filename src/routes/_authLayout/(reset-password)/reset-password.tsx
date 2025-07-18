import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authLayout/(reset-password)/reset-password',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authLayout/(reset-password)/reset-password"!</div>
}
