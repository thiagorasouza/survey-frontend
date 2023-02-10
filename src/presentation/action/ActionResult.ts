export interface ActionResult {
  status: "success" | "error";
  error?: any;
  data?: any;
}
