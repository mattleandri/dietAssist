
export const testUser = 
    {
        _id: "654cec8d975af0cc702fd46e",
        username: 'testUser',
        password: '$2a$10$RemD6zSe6mIUdXuCi9Erh.DaoqNj7vwrAh5EdOpMz8hegCyk.ySWq',
        __v: 0
    }

export const testPatient = 
    {
        _id: 'testUser@12345678',
        name: 'Marco',
        surname: 'Aurelio',
        age: 58,
        dni: 12345678,
        sport: 'Pesas',
        ocupation: 'Emperador de Roma',
        goal: 'Aumentar Masa Muscular'
    }

export const testPatientPlan = {
    
    patientId:'testUser@12345678',
    name:'testPlan',
    kcal:3000,
    p: 170,
    f:75,
    c:411,
    days:6,
    meals:4,
    description:'Primer Mes, no Lacteos'
}

/*
kcal p = 680 170g
kcal f = 675 - > 75g 
kcal 1645 -> 411g
*/