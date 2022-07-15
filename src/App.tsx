import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MainPage from "./page/MainPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* devtool */}
      <ReactQueryDevtools initialIsOpen={false} />
      <MainPage />
    </QueryClientProvider>
  );
}

export default App;
