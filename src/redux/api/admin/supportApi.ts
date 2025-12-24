import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';
import { buildResponse } from '@/lib/api-response';
import { Args } from '@/types';

//  ====== Support & Disputes =========
export const supportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSuppTask: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/admin/support/allsupporttask`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.a_support],
      transformResponse: (response: any) => {
        return buildResponse(response.data);
      },
    }),
    getSuppDts: build.query({
      query: ({ id, arg }: Args) => ({
        url: `/admin/support/task/details/${id}`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.a_support_dts],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getSuppUser: build.query({
      query: ({ id, arg }: Args) => ({
        url: `/admin/support/allusersupport/${id}`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.a_support_user],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    rejectStore: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/admin/support/rejectedtask/${id}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [tagTypes.a_support],
    }),
    supportReject: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/admin/support/rejectedspt/${id}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [tagTypes.a_support],
    }),
    approveStore: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/admin/support/approvedtask/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: [tagTypes.a_support],
    }),
    supportApp: build.mutation({
      query: (id) => {
        return {
          url: `/admin/support/approvedspt/${id}`,
          method: 'PUT',
        };
      },
      invalidatesTags: [tagTypes.a_support],
    }),
    replayStore: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/admin/support/answareusersupport/${id}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [tagTypes.a_support],
    }),
  }),
});

export const {
  useGetSuppTaskQuery,
  useGetSuppDtsQuery,
  useRejectStoreMutation,
  useApproveStoreMutation,
  useSupportAppMutation,
  useSupportRejectMutation,
  useReplayStoreMutation,
  useGetSuppUserQuery,
} = supportApi;
