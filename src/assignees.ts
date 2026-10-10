// The assignees API answers 2xx even when it silently drops a login, so check the result.
export function isAssigned(assignees: ReadonlyArray<{ login: string }>, login: string): boolean {
  return assignees.some((a) => a.login.toLowerCase() === login.toLowerCase());
}
