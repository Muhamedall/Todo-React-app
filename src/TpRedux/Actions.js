const types ={
    Add:"ADD-USER",
    Dellet: "DELET-USER",
    Edite:"EDITE-USER",



}


export const  adduser =(Newuser)=>{
    return {type:types.Add,payload:Newuser}
}
export const deletuser=(user)=>{
    return{type:types.Dellet,payload:user}
}
export const edite=(id)=>{
    return{type:types.Edite,payload:id}
}
