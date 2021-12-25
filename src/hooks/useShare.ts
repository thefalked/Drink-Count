import { useContext } from "react";

import { ShareContext } from "../contexts/ShareContext";

export function useShare() {
  const value = useContext(ShareContext);

  return value;
}
