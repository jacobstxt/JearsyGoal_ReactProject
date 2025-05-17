import {useEffect, useState} from "react";
import AxiosInstance from "../../api/axiosInstance";
import {BASE_URL} from "../../api/apiConfig";

const CategoriesPage = () => {

    const [list, setList] = useState([])

    useEffect(() => {
        AxiosInstance.get("/api/Categories")
            .then(res => {
                const {data} = res;
                console.log("Get list of Categories", data);
                setList(data);
            })
            .catch(err => console.log("Problem", err));
        console.log('UseEffect APP', "Викликаємо після рендера");
    },[]);

    return (
        <>
            <h1 className={"text-center"}>Категорії</h1>
            {list.length === 0 ? <h2>Список пустий</h2> :
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Назва</th>
                        <th>Image</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        list.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td><img src={`${BASE_URL}/images/200_${item.image}`} alt={item.name} width={75}/></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            }
        </>
    )
}

export default CategoriesPage;