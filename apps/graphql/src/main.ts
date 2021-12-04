import { GraphQLServer } from 'graphql-yoga';
import { PrismaClient } from '@prisma/client';
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')

const Prisma = new PrismaClient();

const typeDefs = `
  type Post {

    title: String!
    content: String!

  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
    profile: Profile
  }

  type Profile {
    id: ID!
    bio: String
    user: User!
    userId: ID!
  }

  type Query {
    hello(name: String): String!
    allPosts: [String]
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    allPosts: () => {
      return Prisma.post.findMany().then(posts => {
        return posts.map(post =>  { return { title: post.title, content: post.content }}
      )})
    },

  },
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
