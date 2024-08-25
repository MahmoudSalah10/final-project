import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props) {



    const [count, setCount] = useState(0)
    const [userName, setuserName] = useState('ahmed')

    function changeCount() {
        setCount(Math.random)
    }

    return <CounterContext.Provider value={{ count, setCount, changeCount, userName }}>

        {props.children}

    </CounterContext.Provider>
}

