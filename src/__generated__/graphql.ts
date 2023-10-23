/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddCardInput = {
  assigneeId: Scalars['Int']['input'];
  dueDateTime: Scalars['String']['input'];
  teamId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type AddTeamInput = {
  name: Scalars['String']['input'];
};

export type AddTeamMemberInput = {
  teamId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type Card = {
  __typename?: 'Card';
  assignee: User;
  assigneeId: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  dueDateTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status: Status;
  teamId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type CardRaw = {
  __typename?: 'CardRaw';
  assigneeId: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  dueDateTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status: Status;
  teamId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCard: Scalars['String']['output'];
  addTeam: Team;
  addTeamMember: Scalars['String']['output'];
  login: Scalars['String']['output'];
  signup: Scalars['String']['output'];
};


export type MutationAddCardArgs = {
  input: AddCardInput;
};


export type MutationAddTeamArgs = {
  input: AddTeamInput;
};


export type MutationAddTeamMemberArgs = {
  input: AddTeamMemberInput;
};


export type MutationLoginArgs = {
  input?: InputMaybe<LoginInput>;
};


export type MutationSignupArgs = {
  input?: InputMaybe<SignupInput>;
};

export type Query = {
  __typename?: 'Query';
  card?: Maybe<Card>;
  cards: Array<CardRaw>;
  me: User;
  team?: Maybe<Team>;
  teamMembers: Array<User>;
  teams: Array<Team>;
  today: Array<Maybe<Card>>;
  user?: Maybe<User>;
  userCards: Array<CardRaw>;
  users: Array<User>;
};


export type QueryCardArgs = {
  id: Scalars['String']['input'];
};


export type QueryTeamArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTeamMembersArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type SignupInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum Status {
  Done = 'Done',
  InProgress = 'In_progress',
  Open = 'Open'
}

export type Team = {
  __typename?: 'Team';
  adminId: Scalars['Int']['output'];
  cards: Array<Card>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  teamMembers: Array<User>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  personalBoardId?: Maybe<Scalars['Int']['output']>;
};

export type AddCardMutationVariables = Exact<{
  input: AddCardInput;
}>;


export type AddCardMutation = { __typename?: 'Mutation', addCard: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', name: string, email: string, id: string, personalBoardId?: number | null } };

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', name: string, id: string }> };

export type LoginMutationVariables = Exact<{
  input?: InputMaybe<LoginInput>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type SignupMutationVariables = Exact<{
  input?: InputMaybe<SignupInput>;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: string };

export type TeamQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type TeamQuery = { __typename?: 'Query', team?: { __typename?: 'Team', name: string, id: string, adminId: number, cards: Array<{ __typename?: 'Card', title: string, id: string, assigneeId: number, createdAt: string, teamId: number, status: Status, dueDateTime: string, assignee: { __typename?: 'User', name: string, email: string, id: string } }>, teamMembers: Array<{ __typename?: 'User', name: string, email: string, id: string }> } | null };

export type TodayQueryVariables = Exact<{ [key: string]: never; }>;


export type TodayQuery = { __typename?: 'Query', today: Array<{ __typename?: 'Card', title: string, status: Status, dueDateTime: string, createdAt: string, id: string } | null> };


export const AddCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddCardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<AddCardMutation, AddCardMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"personalBoardId"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const TeamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TeamsQuery, TeamsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const TeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Team"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"adminId"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assigneeId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"dueDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"assignee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<TeamQuery, TeamQueryVariables>;
export const TodayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Today"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"today"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"dueDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TodayQuery, TodayQueryVariables>;