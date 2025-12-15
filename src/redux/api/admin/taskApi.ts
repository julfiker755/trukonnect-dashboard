import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';
import { buildResponse } from '@/lib/api-response';
import { Args } from '@/types';

export const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTask: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/admin/task/management/all/orders`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.a_task],
      transformResponse: (response: any) => {
        return buildResponse(response.data);
      },
    }),
    slgTask: build.query({
      query: (id) => ({
        url: `/admin/task/management/task/details/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.a_slg_task],
    }),
    //  ===============
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

export const { useGetTaskQuery, useSlgTaskQuery } = taskApi;
