import { Status } from "../__generated__/graphql";

export const getStatusLabel = (status: Status) => {
  switch (status) {
    case Status.Done:
      return 'Done';
    case Status.InProgress:
      return 'In Progress';
    case Status.Open:
      return 'New';
  }
}
