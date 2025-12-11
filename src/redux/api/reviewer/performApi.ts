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
    taskReject: build.mutation({
      query: ({ id, data }) => ({
        url: `/reviewer/task/rejected/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.r_task],
    }),
    taskReport: build.mutation({
      query: ({ id, data }) => ({
        url: `/reviewer/task/adminreview/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.r_task],
    }),
    taskApproved: build.mutation({
      query: (id) => ({
        url: `/reviewer/task/approved/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: [tagTypes.r_task],
    }),
  }),
});

export const { useGetPerformQuery } = performApi;
