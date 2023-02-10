import { useActionData, useNavigation } from "react-router-dom";
import { ActionResult } from "../action/ActionResult";

export interface AppState {
  status: "initial" | "submitting" | "loading" | "success" | "error";
  error?: any;
  data?: any;
  isInitial: boolean;
  isSubmitting: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

function useAppState<T extends ActionResult>(): AppState {
  const navigation = useNavigation();
  const actionResult = useActionData() as T;

  const generateFlags = (status) => ({
    isInitial: status === "initial",
    isSubmitting: status === "submitting",
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
  });

  if (navigation.state === "submitting" || navigation.state === "loading") {
    return {
      status: navigation.state,
      ...generateFlags(navigation.state),
    };
  }

  if (actionResult) {
    return {
      ...actionResult,
      ...generateFlags(actionResult.status),
    };
  }

  return {
    status: "initial",
    ...generateFlags("initial"),
  };
}

export default useAppState;
