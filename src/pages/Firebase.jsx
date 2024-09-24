import { useEffect, useState } from 'react'
import { db } from './Firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";




export default function Firebase() {
    const [todo, setTodo] = useState(''); // input
    const todoCollection = collection(db, "todos");
    const [todos, setTodos] = useState([]); // array of obj from database




    const handleForm = async (e) => {
        e.preventDefault();
        await addDoc(todoCollection, { todo: todo });
        setTodo('');
        console.log(addDoc)
        console.log("Data addes successfully")
    }


    // show data in ui


    async function getData() {
        await getDocs(collection(db, "todos")) // req ? resove : reject
            .then((res) => {
                const newData = res.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setTodos(newData);
                console.log(res)
                console.log(todos, newData);
            })
    }


    useEffect(() => {


        getData();
    }, [])










    return (
        <div>


            <form onSubmit={handleForm} >
                <input value={todo} onChange={(e) => setTodo(e.target.value)} type="text" placeholder='Add your todo...' />
                <button >Add todo</button>
            </form>




            <div>
                {
                    todos.map((item) => {
                        return <div key={item.id}>
                            <h3>{item.todo}</h3>


                        </div>
                    })
                }
            </div>
        </div>
    )
}


