import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';
import { buildResponse } from '@/lib/api-response';

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
    slgOrder: build.query({
      query: (id) => ({
        url: `/admin/task/management/order/details/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.a_slg_order],
    }),
  }),
});

export const { useGetTaskQuery, useSlgTaskQuery, useSlgOrderQuery } = taskApi;
