import '@/styles/colors.css';
import '@/styles/reset.css';
import '@/styles/globals.scss';
import { Route, Routes } from 'react-router';
import SignInScreen from './screens/SignIn/SignIn';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/ru_RU';
import 'dayjs/locale/ru.js';
import SignUpScreen from './screens/SignUp/SignUp';
import ChatScreen from './screens/Chat/Chat';

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <ConfigProvider locale={locale}>
        <ChakraProvider>
          <Routes>
            <Route path="/" element={<SignInScreen />} />
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/chat" element={<ChatScreen />} />
          </Routes>
        </ChakraProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
