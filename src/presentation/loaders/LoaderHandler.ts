import { LoaderFunctionArgs } from "react-router-dom";
import { LoaderResult } from "./LoaderResult";

export interface LoaderHandler {
  handle(args: LoaderFunctionArgs): Promise<LoaderResult>;
}
