import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';
import { buildResponse } from '@/lib/api-response';

export const profileApiAdmin = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTerms: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/terms/condition`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.terams],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    termsStore: build.mutation({
      query: (data) => {
        return {
          url: '/admin/terms/condition',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [tagTypes.terams],
    }),
    getPrivacy: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/privacy/policy`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.privacy],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    privacyStore: build.mutation({
      query: (data) => {
        return {
          url: '/admin/privacy/policy',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [tagTypes.privacy],
    }),
    getAdmin: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/admin/list`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.a_admin],
      transformResponse: (response: any) => {
        return buildResponse(response.data);
      },
    }),
    adminStore: build.mutation({
      query: (data) => {
        return {
          url: '/admin/store',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [tagTypes.a_admin],
    }),
  }),
});

export const {
  useGetTermsQuery,
  useTermsStoreMutation,
  useGetPrivacyQuery,
  usePrivacyStoreMutation,
  useGetAdminQuery,
  useAdminStoreMutation,
} = profileApiAdmin;
