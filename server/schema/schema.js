const { projects, clients } = require('../sampleData')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql')

// Mongoose Models
const Project = require('../model/Project')
const Client = require('../model/Client')

// types
const clientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
})

const projectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: clientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId)
      },
    },
  }),
})

// Queries
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    allprojects: {
      type: new GraphQLList(projectType),
      resolve(parent, args) {
        return Project.find({})
      },
    },
    project: {
      type: projectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Project.findById(args.id)
      },
    },

    allclient: {
      type: new GraphQLList(clientType),
      resolve(parent, args) {
        return Client.find({})
      },
    },
    client: {
      type: clientType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Client.findById(args.id)
      },
    },
  },
})

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a client
    addClient: {
      type: clientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        })

        return client.save()
      },
    },
    // Delete a client
    deleteClient: {
      type: clientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Project.find({ clientId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.remove()
          })
        })

        return Client.findByIdAndRemove(args.id)
      },
    },
    // Update a client
    updateClient: {
      type: clientType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Client.findByIdAndUpdate(
          args.id,
          {
            name: args.name,
            email: args.email,
            phone: args.phone,
          },
          { new: true }
        )
      },
    },
    // Add a project
    addProject: {
      type: projectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        })

        return project.save()
      },
    },
    // Delete a project
    deleteProject: {
      type: projectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id)
      },
    },
    // Update a project
    updateProject: {
      type: projectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        )
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
