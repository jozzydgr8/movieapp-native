import { createContext, useReducer } from "react";


const initialState = {
    loading:false,
    data:null
}

export const Context = createContext();

const reducer = (state, action)=>{
    switch(action.type){
        case 'getData':
            return {...state, data:action.payload}

        case 'loading':
            return {...state, loading:action.payload}

        default: return state;
    }
}
export function ContextData({children}){
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <Context.Provider value={{...state, dispatch}}>
            {children}
        </Context.Provider>
    )
}