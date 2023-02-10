import { ActionFunctionArgs } from "react-router-dom";
import { ActionResult } from "./ActionResult";

export interface ActionHandler {
  handle(args: ActionFunctionArgs): Promise<ActionResult>;
}
