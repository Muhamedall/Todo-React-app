const initialestate=()=>{

    users:[

        { id:"1" ,Name:"MOHAMED ALLAOUI",Email:"Med@gmail.com" }


    ]


};
const reducer =(state=initialestate,action)=>{
    switch (action.type){
        case Add:
            return{...state,users:[...state.users ,action.payload]},
    }
 

}