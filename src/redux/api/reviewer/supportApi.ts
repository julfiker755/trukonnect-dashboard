import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';
import { buildResponse } from '@/lib/api-response';

export const supportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSupport: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/reviewer/support/allsupportticket`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.r_support],
      transformResponse: (response: any) => {
        return buildResponse(response.data);
      },
    }),
    assignAdmin: build.mutation({
      query: ({ id, data }) => ({
        url: `/reviewer/support/assigntoadmin/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.r_support],
    }),
    storeReplay: build.mutation({
      query: ({ id, data }) => ({
        url: `/reviewer/support/answerticket/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.r_support],
    }),
  }),
});

export const { useGetSupportQuery, useAssignAdminMutation, useStoreReplayMutation } = supportApi;
