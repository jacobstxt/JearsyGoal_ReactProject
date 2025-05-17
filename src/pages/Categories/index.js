import {useEffect, useState} from "react";
import axios from "axios";

const  CategoriesPage = ()=>{

    //Use State - вміє при зміні викликати рендер компонента в якому знаходиться
    const [list, setList] = useState([]);
   

    useEffect(()=>{
        axios.get("http://localhost:5025/api/Categories")
            .then((res) => {
                const{data}  = res;
                console.log("Get list of categories",res.data);
                setList(data);
            })
            .catch((err) => {console.log("Problem error",err)});
    },[]);


    return (
        <>
            <h1 className={"text-center mt-5"}>Categories List</h1>
            {list.length===0 ? <h1>The List is empty</h1>:

                <table className="table table-bordered mt-5">
                    <thead>

                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Назва</th>
                        <th scope="col">Фото</th>
                    </tr>

                    </thead>
                    <tbody>
                    {list.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td><img src={`http://localhost:5025/images/200_${item.image}`} alt={item.name} width={75}/></td>
                        </tr>
                    ))
                    }

                    </tbody>
                </table>
            }


        </>
    );


}


export  default CategoriesPage;