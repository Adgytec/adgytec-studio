import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authLayout/(login)/confirm-login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authLayout/(login)/confirm-login"!</div>
}
