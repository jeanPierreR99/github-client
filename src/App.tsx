import RepositoryProfile from "./page/RepositoryProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
        <RepositoryProfile></RepositoryProfile>
      </div>
    </QueryClientProvider>
  );
}

export default App;
