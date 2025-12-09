import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';

export const overviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    adminOverview: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/admin/dashboard`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.a_admin_overview],
      transformResponse: (res: any) => {
        return res.data;
      },
    }),
  }),
});

export const { useAdminOverviewQuery } = overviewApi;
