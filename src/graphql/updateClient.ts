import { gql, request } from 'graphql-request';
const endpoint = 'https://test-task.expane.pro/api/graphql';

export const updateCurrentClient = async (formData: any) => {
  const data = await request(
    endpoint,
    gql`
      mutation {
        updateClient(id: "${formData.id}", firstName: "${formData.firstName}", lastName: "${formData.lastName}", phone: "${formData.phone}", avatarUrl: "${formData.avatarUrl}") {
          id
          firstName
          lastName
          phone
          avatarUrl
        }
      }
    `
  );
  return data;
};
