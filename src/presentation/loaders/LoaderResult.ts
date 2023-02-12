export interface LoaderResult {
  status: "success" | "error";
  error?: any;
  data?: any;
}
