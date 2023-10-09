import  jwt  from "jsonwebtoken"
export default function createJWT(username){

    const token = jwt.sign({username:username},process.env.SECRET_TOKEN)
    return token

}