import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';
import { buildResponse } from '@/lib/api-response';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/admin/management/user/list`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.a_user],
      transformResponse: (response: any) => {
        return buildResponse(response.data);
      },
    }),
    getuserManDts: build.query({
      query: (id) => ({
        url: `/admin/management/performer/details/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.a_single_user],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    // bulkNotiStore: build.mutation({
    //   query: (data) => {
    //     return {
    //       url: '/admin/bulk/notification',
    //       method: 'POST',
    //       body: data,
    //     };
    //   },
    // }),
  }),
});

export const { useGetUserQuery, useGetuserManDtsQuery } = userApi;
