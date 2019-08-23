const request = require('supertest')

const db = require('../database/dbConfig')
const server = require('../api/server')

describe("server", () => {
  beforeEach(async () => { //BEFOREEACH says "before each block" ASYNC gives access to "await" or other async options
    await db('users').truncate() //AWAIT responds to a promise with "I hear you, but I'll wait until you're done" TRUNCATE - resets to a clean slate
  })

  it('tests are running with DB_ENV set as "testing', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })

  
  describe('Auth Router', () => {
    describe('/api/auth/register', () => {
      it("401 works", () => {
        request(server)
        .post("/api/auth/register")
        .send()
        .then(res => {
          expect(res.status).toBe(500)
        })
      })
      it('saves a new user to user table', () => {
        request(server)
        .post("/api/auth/register")
        .send({
          "username" : "laura3",
          "password" : "laura3"
        })
        .then(res => {
          expect(res.status).toBe(201)
        })
      })
    })

    describe('/api/auth/login', () => {
      it("401 works", () => {
        request(server)
        .post("/api/auth/login")
        .send()
        .then(res => {
          expect(res.status).toBe(401)
        })
      })
      it("200 works", () => {
        request(server)
        .post("/api/auth/login")
        .send({
          "username" : "laura1",
          "password" : "laura1",
        })
        .then(res => {
          expect(res.status).toBe(200)
        })
      })
    })
  })

  describe('/api/jokes', () => {
  //   it("500 works", () => {
  //     request(server)
  //     .get("/api/jokes")
  //     .send()
  //     .then(res => {
  //       expect(res.status).toBe(500)
  //     })
  //   })
    it("200 works", () => {
      return request(server)
      .get("/api/jokes")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImxhdXJhMSIsImlhdCI6MTU2NjU4NDk2MSwiZXhwIjoxNTY2NjEzNzYxfQ.76az37pG5Cz_iclxe4XV1eS6EiNoUY7lKEbgECsDoaQ"
      )
      .then(res => {
        expect(res.status).toBe(200)
      })
    })
  })
})

  
