export const graphQlApiHandler = async (reqType, mutation, payload) => {
  switch (reqType) {
  case 'Login':
    try {
      return await mutation(payload);
    } catch (err) {
      return { message: err.message, status: 'error' };
    }
  default:
    return 'NOT A VALID REQUEST';
  }
};
