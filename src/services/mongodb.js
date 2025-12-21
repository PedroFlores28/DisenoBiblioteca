import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.VUE_APP_MONGODB_URI || 'mongodb://localhost:27017'
const DB_NAME = process.env.VUE_APP_MONGODB_DB || 'biblioteca'
const COLLECTION_NAME = 'carreras'

let client = null
let db = null

async function getConnection() {
  if (client && db) {
    return { client, db }
  }

  try {
    client = new MongoClient(MONGODB_URI)
    await client.connect()
    db = client.db(DB_NAME)
    return { client, db }
  } catch (error) {
    console.error('Error conectando a MongoDB:', error)
    throw error
  }
}

export const mongodbService = {
  async getCareers() {
    try {
      const { db } = await getConnection()
      const collection = db.collection(COLLECTION_NAME)
      const careers = await collection.find({}).toArray()
      // Convertir _id de ObjectId a string para Vue
      return careers.map(career => ({
        ...career,
        id: career._id.toString(),
        _id: undefined
      }))
    } catch (error) {
      console.error('Error obteniendo carreras:', error)
      // Retornar array vacío si hay error
      return []
    }
  },

  async getCareersBySchool(schoolKey) {
    try {
      const { db } = await getConnection()
      const collection = db.collection(COLLECTION_NAME)
      const careers = await collection.find({ school: schoolKey }).toArray()
      return careers.map(career => ({
        ...career,
        id: career._id.toString(),
        _id: undefined
      }))
    } catch (error) {
      console.error('Error obteniendo carreras por escuela:', error)
      return []
    }
  },

  async closeConnection() {
    if (client) {
      await client.close()
      client = null
      db = null
    }
  }
}

