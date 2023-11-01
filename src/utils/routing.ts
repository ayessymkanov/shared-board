export const getCurrentRoute = (pathname: string): string => {
  const parts = pathname.split('/');

  if (parts.length === 1) {
    return "";
  }

  if (parts.length > 2) {
    parts.pop();
  }

  return parts[1];
}
