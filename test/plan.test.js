import { dietAssistDB } from "../DB/dbConnection";
import { plansSchema } from "../schemas/groups";
import { app } from "../app";
import request from "supertest";
import {jest} from '@jest/globals';
import { response } from "express";
import { testPatient,testPatientPlan } from "./testUserData";

const Plans = dietAssistDB.model('plans')

describe('Plan Router Test',()=>{

    //newPlan getPlan getPlanName.. delete plan not exits
    describe('Plan CRUD',()=>{

        describe('newPlan',()=>{

            let response = null

            beforeAll(async ()=>{

                response = await request(app)
                .post('/createPlan/newPlan')
                .send({...testPatientPlan})

            })   

            test('Must return 200 code and Name plan',()=>{

                expect(response.status).toBe(200)
                expect(response.body.name).toBe(testPatientPlan.name)
            

            })

            test('Middleware checkName must return 400 code and aprop msj ',async()=>{

                const response2 = await request(app)
                .post('/createPlan/newPlan')
                .send({...testPatientPlan})

                expect(response2.status).toBe(400)
                expect(response2.body.err).toBe('Name Plan already exists')

            })

            afterAll(async()=>{

                await Plans.deleteOne({_id:`${testPatientPlan.patientId}@${testPatientPlan.name}`})

            })
            

        })


    })


})