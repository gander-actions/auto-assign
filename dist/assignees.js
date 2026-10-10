// The assignees API answers 2xx even when it silently drops a login, so check the result.
export function isAssigned(assignees, login) {
    return assignees.some((a) => a.login.toLowerCase() === login.toLowerCase());
}
