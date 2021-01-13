import React from 'react';
import Main from './Main';
//import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';

const httpLink = new HttpLink({ uri: 'http://192.168.1.3:4000/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      //authorization: 'Basic Zm9vQ2xpZW50SWQ6c2VjcmV0',
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTA1NjQwNDUsInVzZXJfbmFtZSI6InNhbG1hbnB6ckBnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl0sImp0aSI6ImNmNGFjMmUwLTAxMTktNDI3Yi1iMmQ2LWZiYTZmM2NmNTdlZCIsImNsaWVudF9pZCI6ImZvb0NsaWVudElkIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.AB6lRzl8uubQMXsTYZq5tiM8WDR1DMD6XcJaNnDVd4E'
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
  //uri: 'http://localhost:4000/graphql',
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
});

export default function App() { 

  return (    
    <ApolloProvider client={client}>
      <Main/>
    </ApolloProvider>    
  );

}
