import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";
import { authKey, helpers } from "@/lib";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
      prepareHeaders: (headers) => {
        const token = helpers.getAuthCookie(authKey);
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
          headers.set("accept", "application/json");
        }
        return headers;
      },
    });

    let result = await baseQuery(args, api, extraOptions);
    // Check if the token is expired (Assuming status 401 means expired token)
    if (result.error && result.error.status === 401) {
      const newToken = await refreshAuthToken();
      if (newToken) {
        helpers.setAuthCookie(authKey, newToken);
        args.headers.set("Authorization", `Bearer ${newToken}`);
        result = await baseQuery(args, api, extraOptions);
      }
    }

    return result;
  },
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});

// == freshToken Generate ==
async function refreshAuthToken() {
  const token = helpers.getAuthCookie(authKey);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refreshtoken`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data?.token;
}
