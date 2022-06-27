import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';
import { supabase } from '../utils/supabase';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { push, pathname } = useRouter();
  const validateSession = async () => {
    const user = supabase.auth.user();
    console.log('🚀 ~ file: _app.tsx ~ line 21 ~ validateSession ~ user', user);
    if (user && pathname === '/') {
      push('/notes');
    } else if (!user && pathname !== '/') {
      await push('/');
    }
  };
  supabase.auth.onAuthStateChange((event, _) => {
    if (event === 'SIGNED_IN' && pathname === '/') {
      push('/notes');
    }
    if (event === 'SIGNED_OUT') {
      push('/');
    }
  });
  useEffect(() => {
    validateSession();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
