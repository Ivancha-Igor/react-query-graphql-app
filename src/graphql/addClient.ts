import { gql, request } from 'graphql-request';
const endpoint = 'https://test-task.expane.pro/api/graphql';

export const addNewClient = async (formData: any) => {
  const data = await request(
    endpoint,
    gql`
      mutation {
        addClient(firstName: "${formData.firstName}", lastName: "${formData.lastName}", phone: "${formData.phone}", avatarUrl: "${formData.avatarUrl}") {
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
