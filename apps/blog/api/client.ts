import { createClient, Provider as GraphQLProvider } from 'urql';

export const client = createClient({
  url: 'http://localhost:4000/graphql',
});

type ProviderProps = {
  children: React.ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => (
  <GraphQLProvider value={client}>
    {children}
  </GraphQLProvider>
)
