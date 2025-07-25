/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as HomeLayoutRouteRouteImport } from './routes/_homeLayout/route'
import { Route as AuthLayoutRouteRouteImport } from './routes/_authLayout/route'
import { Route as HomeLayoutIndexRouteImport } from './routes/_homeLayout/index'
import { Route as DemoTanstackQueryRouteImport } from './routes/demo.tanstack-query'
import { Route as AuthLayoutLoginRouteImport } from './routes/_authLayout/login'

const HomeLayoutRouteRoute = HomeLayoutRouteRouteImport.update({
  id: '/_homeLayout',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthLayoutRouteRoute = AuthLayoutRouteRouteImport.update({
  id: '/_authLayout',
  getParentRoute: () => rootRouteImport,
} as any)
const HomeLayoutIndexRoute = HomeLayoutIndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => HomeLayoutRouteRoute,
} as any)
const DemoTanstackQueryRoute = DemoTanstackQueryRouteImport.update({
  id: '/demo/tanstack-query',
  path: '/demo/tanstack-query',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthLayoutLoginRoute = AuthLayoutLoginRouteImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthLayoutRouteRoute,
} as any)

export interface FileRoutesByFullPath {
  '/login': typeof AuthLayoutLoginRoute
  '/demo/tanstack-query': typeof DemoTanstackQueryRoute
  '/': typeof HomeLayoutIndexRoute
}
export interface FileRoutesByTo {
  '/login': typeof AuthLayoutLoginRoute
  '/demo/tanstack-query': typeof DemoTanstackQueryRoute
  '/': typeof HomeLayoutIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/_authLayout': typeof AuthLayoutRouteRouteWithChildren
  '/_homeLayout': typeof HomeLayoutRouteRouteWithChildren
  '/_authLayout/login': typeof AuthLayoutLoginRoute
  '/demo/tanstack-query': typeof DemoTanstackQueryRoute
  '/_homeLayout/': typeof HomeLayoutIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/login' | '/demo/tanstack-query' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/login' | '/demo/tanstack-query' | '/'
  id:
    | '__root__'
    | '/_authLayout'
    | '/_homeLayout'
    | '/_authLayout/login'
    | '/demo/tanstack-query'
    | '/_homeLayout/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  AuthLayoutRouteRoute: typeof AuthLayoutRouteRouteWithChildren
  HomeLayoutRouteRoute: typeof HomeLayoutRouteRouteWithChildren
  DemoTanstackQueryRoute: typeof DemoTanstackQueryRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_homeLayout': {
      id: '/_homeLayout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof HomeLayoutRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_authLayout': {
      id: '/_authLayout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthLayoutRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_homeLayout/': {
      id: '/_homeLayout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof HomeLayoutIndexRouteImport
      parentRoute: typeof HomeLayoutRouteRoute
    }
    '/demo/tanstack-query': {
      id: '/demo/tanstack-query'
      path: '/demo/tanstack-query'
      fullPath: '/demo/tanstack-query'
      preLoaderRoute: typeof DemoTanstackQueryRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_authLayout/login': {
      id: '/_authLayout/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLayoutLoginRouteImport
      parentRoute: typeof AuthLayoutRouteRoute
    }
  }
}

interface AuthLayoutRouteRouteChildren {
  AuthLayoutLoginRoute: typeof AuthLayoutLoginRoute
}

const AuthLayoutRouteRouteChildren: AuthLayoutRouteRouteChildren = {
  AuthLayoutLoginRoute: AuthLayoutLoginRoute,
}

const AuthLayoutRouteRouteWithChildren = AuthLayoutRouteRoute._addFileChildren(
  AuthLayoutRouteRouteChildren,
)

interface HomeLayoutRouteRouteChildren {
  HomeLayoutIndexRoute: typeof HomeLayoutIndexRoute
}

const HomeLayoutRouteRouteChildren: HomeLayoutRouteRouteChildren = {
  HomeLayoutIndexRoute: HomeLayoutIndexRoute,
}

const HomeLayoutRouteRouteWithChildren = HomeLayoutRouteRoute._addFileChildren(
  HomeLayoutRouteRouteChildren,
)

const rootRouteChildren: RootRouteChildren = {
  AuthLayoutRouteRoute: AuthLayoutRouteRouteWithChildren,
  HomeLayoutRouteRoute: HomeLayoutRouteRouteWithChildren,
  DemoTanstackQueryRoute: DemoTanstackQueryRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
