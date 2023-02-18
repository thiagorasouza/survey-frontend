import { useActionData, useLoaderData, useNavigation } from "react-router-dom";

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

function useAppState(): AppState {
  const navigation = useNavigation();
  const actionResult = useActionData() as any;
  const loaderResult = useLoaderData() as any;

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
  } else if (loaderResult) {
    return {
      ...loaderResult,
      ...generateFlags(loaderResult.status),
    };
  }

  return {
    status: "initial",
    ...generateFlags("initial"),
  };
}

export default useAppState;
