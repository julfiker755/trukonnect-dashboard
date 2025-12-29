import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tagTypesList } from '../tag-types';
import { authKey, envs, helpers } from '@/lib';

let refreshingTokenPromise: Promise<string | null> | null = null;

const baseQuery = fetchBaseQuery({
  baseUrl: envs.api_url,
  prepareHeaders: (headers) => {
    const token = helpers.getAuthCookie(authKey);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('accept', 'application/json');
    }else {
    headers.delete('Authorization')
  }
    return headers;
  },
});

const customBaseQuery = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  // If unauthorized, try refresh flow
  if (result.error && result.error.status === 401) {
    // Prevent multiple refreshes at the same time
    if (!refreshingTokenPromise) {
      refreshingTokenPromise = refreshAuthToken();
    }

    const newToken = await refreshingTokenPromise;
    refreshingTokenPromise = null;

    if (newToken) {
      helpers.setAuthCookie(authKey, newToken);
      // Retry previous request with new token
      const retryResult = await baseQuery(
        {
          ...args,
          headers: {
            ...(args.headers || {}),
            Authorization: `Bearer ${newToken}`,
          },
        },
        api,
        extraOptions
      );

      return retryResult;
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});

// === Token Refresh Function ===
async function refreshAuthToken() {
  const token = helpers.getAuthCookie(authKey);
  if(token){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refreshtoken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data?.token
  }
}

