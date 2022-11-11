import { type DataFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { updateIssue } from "~/data";
import { emitter, EVENTS } from "~/events";

export let action = async ({ params, request }: DataFunctionArgs) => {
  let updates = Object.fromEntries(await request.formData());
  invariant(params.id, "Missing issue id");
  let result = await updateIssue(params.id, updates);
  emitter.emit(EVENTS.ISSUE_CHANGED, Date.now());
  return result;
};
