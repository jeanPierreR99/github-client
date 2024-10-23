import { GitHubProvider } from "./context/Context.provider";
import RepositoryProfile from "./page/RepositoryProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
        <GitHubProvider>
          <RepositoryProfile></RepositoryProfile>
        </GitHubProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
