import { Fragment } from "react";
import ContextBox from "../component/ContextBox";
import { useInfiniteData } from "../hook/query/useInfiniteData";

const MainPage = () => {
  const query = useInfiniteData() as any;

  console.log(query);
  let content = <div>asd</div>;

  if (query.isError) {
    content = <p>Error</p>;
  }

  if (query.isLoading) {
    content = <p>Loading</p>;
  }

  if (query.isSuccess) {
    content = (
      <Fragment>
        {query.data.pages.map((el: any) => (
          <ContextBox name={el.result.name} />
        ))}
      </Fragment>
    );
  }
  return (
    <Fragment>
      {content}
      <button onClick={() => query.fetchNextPage()}>asdsa</button>
    </Fragment>
  );
};

export default MainPage;
