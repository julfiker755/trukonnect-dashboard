import { baseApi } from '../baseApi';

//  ====== Communication Tools =========
export const comtionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    bulkEmailStore: build.mutation({
      query: (data) => {
        return {
          url: '/admin/bulk/email',
          method: 'POST',
          body: data,
        };
      },
    }),
    bulkNotiStore: build.mutation({
      query: (data) => {
        return {
          url: '/admin/bulk/notification',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const { useBulkEmailStoreMutation, useBulkNotiStoreMutation } = comtionApi;
