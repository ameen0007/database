import {useEffect,useRef} from 'react'
import './todoinput.css'

/----------------------------------------------------------------/
export const Todoinput = ({HandleFetchInput,AddTodo,userInputData}) => {

  const inputref = useRef()
   
  useEffect(() => {
    inputref.current.focus()
  }, [])
  

  return (

    <div className='totdoinput-container'>

        <input ref={inputref} type="text" value={userInputData} placeholder='New Todo'onChange={HandleFetchInput}/>
        <button onClick={AddTodo}>ADD TODO</button>

    </div>

  )
  
}
