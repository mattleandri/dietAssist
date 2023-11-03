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