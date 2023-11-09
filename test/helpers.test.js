import { getDayName } from "../controllers/helpers/days";
import request from 'supertest'


describe('getDayName Helper',()=>{

    const weekDays = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'] 

    describe('Week day Case', () => {
      
        for(let i=0;i<7;i++){
            test(`Must return "${weekDays[i]}"`,()=>{
                expect(getDayName(i,[])).toBe(weekDays[i])
            })
        }
    })
    
    describe('"Dia"+Number Case',()=>{
        for(let i=0;i<7;i++){
            test(`Must return "Dia${i+1}"`,()=>{
                expect(getDayName(i,[weekDays[i]])).toBe(`Dia${i+1}`)
            })
        }
    })

    describe('"Dia+Number+Letter" Case',()=>{

        for(let i=0;i<7;i++){
            test(`Must return "Dia${i+1}A"`,()=>{
                expect(getDayName(i,[weekDays[i],`Dia${i+1}`])).toBe(`Dia${i+1}A`)
            })
        }

    })

    describe('"Dia+Number+ 2nd Letter" Case',()=>{

        for(let i=0;i<7;i++){
            test(`Must return "Dia${i+1}B"`,()=>{
                expect(getDayName(i,[weekDays[i],`Dia${i+1}`,`Dia${i+1}A`])).toBe(`Dia${i+1}B`)
            })
        }

    })

})
