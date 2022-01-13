import { useMemo } from "react";

export const matchCurrentPath = (path: string): string | undefined => {
  const pathname = window.location.pathname;
  const pathList = pathname.split('/');
  return pathList.find((item) => item === path);
}

export const useMatchActivedRoute = (paths: string[]) => {
  const current = useMemo(() => paths.find(item => matchCurrentPath(item)), [paths]);
  return current;
}