export const actionErrorsPayload = (error) => {
  return error.response && error.response.data
    ? error.response.data
    : { message: error.message };
};
