import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';
import { buildResponse } from '@/lib/api-response';

export const performApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPerform: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/reviewer/performed-task/allpallperformedtask`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.r_perform],
      transformResponse: (response: any) => {
        return buildResponse(response.data);
      },
    }),
    performReject: build.mutation({
      query: ({ id, data }) => ({
        url: `/reviewer/performed-task/rejected/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.r_perform],
    }),
    performReport: build.mutation({
      query: ({ id, data }) => ({
        url: `/reviewer/performed-task/adminreview/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.r_perform],
    }),
    perfromApp: build.mutation({
      query: (id) => ({
        url: `/reviewer/performed-task/approved/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: [tagTypes.r_perform],
    }),
  }),
});

export const {
  useGetPerformQuery,
  usePerfromAppMutation,
  usePerformRejectMutation,
  usePerformReportMutation,
} = performApi;
