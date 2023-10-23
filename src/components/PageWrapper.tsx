import { FC, ReactNode } from "react";
import PageTitle from "./PageTitle";

type Props = {
  loading?: boolean;
  title?: string;
  children: ReactNode;
}

const PageWrapper: FC<Props> = ({ loading, title, children }) => {
  const renderPageTitle = () => {
    if (!title) {
      return null;
    }

    return <PageTitle>{title}</PageTitle>;
  }

  const renderContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    return children;
  }

  return (
    <div>
      {renderPageTitle()}
      {renderContent()}
    </div>
  );
}

export default PageWrapper;
