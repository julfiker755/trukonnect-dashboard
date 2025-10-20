import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const engagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSoMedia: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/admin/social-media/all`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.socialMedia],
    }),
    storeSoMedia: build.mutation({
      query: (data) => {
        return {
          url: "/admin/social-media/add",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.socialMedia],
    }),
  }),
});

export const { useGetSoMediaQuery, useStoreSoMediaMutation } = engagementApi;
