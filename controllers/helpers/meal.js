import { dietAssistDB } from "../../DB/dbConnection.js"


export const getMealName = (amount) =>{

    const basicNames = ['Desayuno','Almuerzo','Merienda','Cena']

    if(amount<5){
        switch(amount){
            case 1: return ['PlatoPrincipal']
            case 2: return [basicNames[1],basicNames[3]]
            case 3: return [...basicNames.filter(name=> name != basicNames[2])]
            case 4: return [...basicNames]
        }
    
    }
    else{
        const mealNames = [...basicNames]
        const resto = amount - 4 
        let paresAgg=0
        let impAgg=0

        for(let i=0 ; i<resto ; i++){

            if(i%2==0){
                mealNames.splice(1+paresAgg,0,`Colacion${paresAgg+1}`)
                paresAgg++
            }

            if(i%2!=0){
                mealNames.splice(3+impAgg+paresAgg,0,`Colacion${impAgg+1}`)
                impAgg++
            }

        }

        return mealNames

    }

}


//Adding meals according the distribiution seted (amount of meals is the important)
export function getDefMeals({meals:amount,mealNames,p,c,f,kcal}){
    //TODO:agg poder recibir porcentaje especificado de distribucion

        const Meal = dietAssistDB.model('meals')
    
        const percentage=100/amount
    
        let meals=[]
    
        const goal={
            p:p*(percentage/100),
            c:c*(percentage/100),
            f:f*(percentage/100),
            kcal:kcal*(percentage/100)
        }
        
        for(let i=0;i<amount;i++){
            const meal = new Meal ({
                name: mealNames[i],
                percentage: 0,
                goal: goal,
                foods:[],
                autoCalculate:false
            }) 
            meals.push(meal)
    
        }
    
        
        
        return meals
    }
    