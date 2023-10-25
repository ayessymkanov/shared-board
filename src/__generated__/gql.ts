/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation AddCard($input: AddCardInput!) {\n    addCard(input: $input)\n  }\n": types.AddCardDocument,
    "\n  query Me{\n    me {\n      name\n      email\n      id\n      personalBoardId\n    }\n  }\n": types.MeDocument,
    "\n  query Teams {\n    teams {\n      name\n      id\n    }\n  }\n": types.TeamsDocument,
    "\n  query GetCards($input: CardsFilterInput) {\n    cards(input: $input) {\n      dueDateTime\n      title\n      status\n      id\n      teamId\n      team {\n        name \n      }\n    }\n  }\n": types.GetCardsDocument,
    "\n  mutation Login($input: LoginInput) {\n    login(input: $input)\n  }\n": types.LoginDocument,
    "\n  mutation Signup($input: SignupInput) {\n    signup(input: $input)\n  }\n": types.SignupDocument,
    "\n  query Team($id: Int!) {\n    team(id: $id) {\n      name\n      id\n      adminId\n      cards {\n        title\n        id\n        assigneeId\n        createdAt\n        teamId \n        status\n        dueDateTime\n        assignee {\n          name\n          email \n          id\n        }\n      }\n      teamMembers {\n        name\n        email\n        id\n      }\n    }\n  }\n": types.TeamDocument,
    "\n  query Today {\n    today {\n      title\n      status\n      dueDateTime\n      createdAt\n      id\n    }\n  }\n": types.TodayDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddCard($input: AddCardInput!) {\n    addCard(input: $input)\n  }\n"): (typeof documents)["\n  mutation AddCard($input: AddCardInput!) {\n    addCard(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Me{\n    me {\n      name\n      email\n      id\n      personalBoardId\n    }\n  }\n"): (typeof documents)["\n  query Me{\n    me {\n      name\n      email\n      id\n      personalBoardId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Teams {\n    teams {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  query Teams {\n    teams {\n      name\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCards($input: CardsFilterInput) {\n    cards(input: $input) {\n      dueDateTime\n      title\n      status\n      id\n      teamId\n      team {\n        name \n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCards($input: CardsFilterInput) {\n    cards(input: $input) {\n      dueDateTime\n      title\n      status\n      id\n      teamId\n      team {\n        name \n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($input: LoginInput) {\n    login(input: $input)\n  }\n"): (typeof documents)["\n  mutation Login($input: LoginInput) {\n    login(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Signup($input: SignupInput) {\n    signup(input: $input)\n  }\n"): (typeof documents)["\n  mutation Signup($input: SignupInput) {\n    signup(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Team($id: Int!) {\n    team(id: $id) {\n      name\n      id\n      adminId\n      cards {\n        title\n        id\n        assigneeId\n        createdAt\n        teamId \n        status\n        dueDateTime\n        assignee {\n          name\n          email \n          id\n        }\n      }\n      teamMembers {\n        name\n        email\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Team($id: Int!) {\n    team(id: $id) {\n      name\n      id\n      adminId\n      cards {\n        title\n        id\n        assigneeId\n        createdAt\n        teamId \n        status\n        dueDateTime\n        assignee {\n          name\n          email \n          id\n        }\n      }\n      teamMembers {\n        name\n        email\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Today {\n    today {\n      title\n      status\n      dueDateTime\n      createdAt\n      id\n    }\n  }\n"): (typeof documents)["\n  query Today {\n    today {\n      title\n      status\n      dueDateTime\n      createdAt\n      id\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;