import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Widget } from "./pages/widget";
import { Login } from "./pages/login";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/widget" element={<Widget />}></Route>
        </Routes>
      </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition='top-right' />
    </QueryClientProvider>
  );
}

export default App;
