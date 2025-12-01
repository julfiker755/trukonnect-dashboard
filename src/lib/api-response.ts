// pagination
export function buildResponse(item: any) {
  const { current_page, per_page, total, data } = item;
  return {
    data: data || [],
    meta: {
      current_page: current_page || 1,
      per_page: per_page || 10,
      total: total || 0,
    },
  };
}

export function buildPagination(data: any) {
  const { current_page, per_page, total } = data;
  return { current_page, per_page, total };
}

export const ResponseApiErrors = (res: any, form: any) => {
  if (res?.errors) {
    Object.entries(res.errors).forEach(([field, messages]) => {
      let msg: string = 'Invalid value';
      if (Array.isArray(messages) && messages.length > 0 && typeof messages[0] === 'string') {
        msg = messages[0];
      }
      form.setError(field, {
        type: 'manual',
        message: msg,
      });
    });
  }
};
