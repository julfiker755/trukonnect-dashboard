import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRoverview: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/reviewer/dashboard`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.a_reviewer],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetRoverviewQuery } = dashboardApi;
