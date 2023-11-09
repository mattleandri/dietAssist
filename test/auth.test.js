
import request from "supertest"
import { app } from "../app"
import { userSchema } from "../schemas/users"
import { dietAssistDB } from "../DB/dbConnection"
import {jest} from '@jest/globals';     //necessary usin ECMA
import jwt from 'jsonwebtoken';

const Users = dietAssistDB.model('users')

describe('Auth Controllers Test', ()=>{


    describe('logIn',()=>{

        describe('Good username/password ',()=>{

            let response =null
            beforeAll(async()=>{
                response = await request(app)
                .post('/auth/login')
                .send({username:'testUser',password:'test123450'})
            })
    
            test('Must return status 200', ()=>{
                expect(response.status).toBe(200)   
            })
    
            test('Must return valid JWT with username in Payload',()=>{
                expect(jwt.verify(response.body.token,process.env.SECRET_TOKEN).username)
                .toBe('testUser')
            })
    
        })
    
       
    
        test('Bad username/password', async ()=>{
    
            let response = await request(app)
            .post('/auth/login')
            .send({username:'mattleandri',password:'wrongPass'})
            expect(response.status).toBe(401)
    
        })

    })

    //TODO:signUp
    

})