import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ClientsList } from './components/ClientsList';

const queryClient = new QueryClient();

function App() {
  return (
    <div className='p-8 bg-gray-200 min-h-screen'>
      <QueryClientProvider client={queryClient}>
        <ClientsList />
      </QueryClientProvider>
    </div>
  );
}

export default App;
