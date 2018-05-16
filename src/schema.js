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
  description: 'This is a person type',
  fields: () => ({
    firstName: {
      type: GraphQLString,
      description: 'A person\'s first name',
      resolve: (person) => person.name.first 
    },
    lastName: {
      type: GraphQLString,
      description: 'A person\'s last name',
      resolve: (person) => person.name.last 
    },
    email: {
      type: GraphQLString
    },
    gender: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLString,
      resolve: (person) => person.id.value
    },
    dob: {
      type: GraphQLString
    },
    phone: { type: GraphQLString },
    cell: { type: GraphQLString },
    registered: { type: GraphQLString }
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query of all',
  fields: () => ({
    People: {
      type: new GraphQLList(PersonType),
      description: 'Everyone in the world',
      resolve: (root, args) => fetch(`${BASE_URL}?results=5000`)
        .then(data => data.json())
        .then(res => res.results)
    }
  })
})

export default new GraphQLSchema({
  query: QueryType,
});