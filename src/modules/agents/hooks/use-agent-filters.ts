import { DEFAULT_PAGE } from "@/contant";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
export const UseAgentFilter = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
  });
};
