import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ClientsList } from './components/ClientsList';

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ClientsList />
      </QueryClientProvider>
    </div>
  );
}

export default App;
