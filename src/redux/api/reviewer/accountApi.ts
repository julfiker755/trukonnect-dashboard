import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';
import { buildResponse } from '@/lib/api-response';

export const accountApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAccount: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/reviewer/account-verification/all`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.r_account],
      transformResponse: (response: any) => {
        return buildResponse(response.data);
      },
    }),
    accReject: build.mutation({
      query: ({ id, data }) => ({
        url: `/reviewer/account-verification/rejected/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.r_account],
    }),
    accApproved: build.mutation({
      query: ({ id, data }) => ({
        url: `/reviewer/account-verification/approved/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.r_account],
    }),
  }),
});

export const { useGetAccountQuery, useAccRejectMutation, useAccApprovedMutation } = accountApi;
