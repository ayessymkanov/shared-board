import { gql } from "../__generated__";

export const UPDATE_CARD = gql(`
  mutation UpdateCard($updateCardId: ID!, $input: UpdateCardInput) {
    updateCard(id: $updateCardId, input: $input)
  }
`);
