// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Student, StudentData, StudentPatch, StudentQuery } from './students.schema'

export type { Student, StudentData, StudentPatch, StudentQuery }

export interface StudentParams extends MongoDBAdapterParams<StudentQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class StudentService<ServiceParams extends Params = StudentParams> extends MongoDBService<
  Student,
  StudentData,
  StudentParams,
  StudentPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('students'))
  }
}
