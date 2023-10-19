import { ApolloClient, ApolloProvider,  HttpLink,  InMemoryCache } from '@apollo/client'
import Users from './components/Users';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import { setContext } from 'apollo-link-context';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND
})
const authLink = setContext(async(req, {headers}) => {
  const token = localStorage.getItem('token')
  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  }
})

const link = authLink.concat(httpLink as any)
const client = new ApolloClient({
  link: (link as any),
  cache: new InMemoryCache()
})


function App() {

  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<Users />}/>
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </ApolloProvider>
  )
}

export default App;