import { readFileSync } from "node:fs";
import { isAssigned } from "./assignees.js";
const ASSIGNEE = "gander";
async function run() {
    const { INPUT_TOKEN: token = "", GITHUB_EVENT_PATH, GITHUB_REPOSITORY } = process.env;
    const { GITHUB_API_URL = "https://api.github.com" } = process.env;
    const event = JSON.parse(readFileSync(GITHUB_EVENT_PATH ?? "", "utf8"));
    const number = event.issue?.number ?? event.pull_request?.number;
    if (number === undefined)
        throw new Error("unsupported event: expected an issue or pull request");
    const res = await fetch(`${GITHUB_API_URL}/repos/${GITHUB_REPOSITORY}/issues/${number}/assignees`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({ assignees: [ASSIGNEE] }),
    });
    if (!res.ok)
        throw new Error(`assigning ${ASSIGNEE} to #${number} failed: HTTP ${res.status}`);
    const body = await res.json();
    if (!isAssigned(body.assignees, ASSIGNEE)) {
        throw new Error(`${ASSIGNEE} was not assigned to #${number} (not a collaborator?)`);
    }
}
run().catch((err) => {
    console.log(`::error::${err.message.replace(/\r?\n/g, " ")}`);
    process.exitCode = 1;
});
