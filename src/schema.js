import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} from 'graphql';

import fetch from 'node-fetch'

import { BASE_URL } from './constants'

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'A star wars Ccaracter',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'A character\'s  name',
      resolve: (person) => person.name 
    },
    gender: {
      type: GraphQLString
    }
    // vehicles: {
    //   type: GraphQLString,
    // },
    // films: {
    //   type: GraphQLString,
    //   resolve: (person) => person.id.value
    // },
    // species: {
    //   type: GraphQLString
    // },
    // starships: { type: GraphQLString }
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query of all',
  fields: () => ({
    People: {
      type: new GraphQLList(PersonType),
      description: 'All Star Wars Characters',
      resolve: (root, args) => fetch(`${BASE_URL}/people`)
        .then(data => data.json())
        .then(res => res.results)
    },
    Person: {
      type: PersonType,
      args: {
        id: { 
          type: GraphQLString
        }
      },
      resolve: (root, args) => fetch(`${BASE_URL}/people/${args.id}`)
          .then(data => data.json())
          .then(res => res)
      }
  })
})

export default new GraphQLSchema({
  query: QueryType,
});