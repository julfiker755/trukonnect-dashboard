import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPerformance: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/admin/performance`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.a_performance],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetPerformanceQuery } = dashboardApi;
