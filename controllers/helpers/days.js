export const getDayName = (amount,diasExistentes) =>{

    const weekDays = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'] 

    if (amount >= 0 && amount < 7) {
        if (!diasExistentes.includes(weekDays[amount])) {
            return weekDays[amount];
        } else if (!diasExistentes.includes(`Dia${amount + 1}`)) {
            return `Dia${amount + 1}`;
        } else {
            return addLetterToName (amount,diasExistentes);
        }
    } else if (amount >= 7) {
        if (!diasExistentes.includes(`Dia${amount + 1}`)) {
            return `Dia${amount + 1}`;
        }
    }

}

export const addLetterToName = (amount,diasExistentes) =>{

    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let existe = true

    while (existe) {
        for (let i = 0; i < alfabeto.length; i++) {
            const letra = alfabeto[i];
            const nombre = `Dia${amount + 1}${letra}`;
    
            if (!diasExistentes.includes(nombre)) {
                existe = false;
                return nombre
            }
        }
    }


}