// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Student, StudentData, StudentPatch, StudentQuery, StudentService } from './students.class'

export type { Student, StudentData, StudentPatch, StudentQuery }

export type StudentClientService = Pick<StudentService<Params<StudentQuery>>, (typeof studentMethods)[number]>

export const studentPath = 'students'

export const studentMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const studentClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(studentPath, connection.service(studentPath), {
    methods: studentMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [studentPath]: StudentClientService
  }
}
