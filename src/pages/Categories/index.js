import {useEffect, useState} from "react";
import AxiosInstance from "../../api/axiosInstance";
import {BASE_URL} from "../../api/apiConfig";
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';

const CategoriesPage = () => {

    const [list, setList] = useState([])
    const navigate = useNavigate();

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

    const handleEdit = (id) => {
        navigate(`/Categories/Edit/${id}`);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Ви впевнені?',
            text: "Цю категорію буде видалено назавжди!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#cf1212',
            confirmButtonText: 'Так, видалити!',
            cancelButtonText: 'Відмінити'
        }).then((result) => {
            if (result.isConfirmed) {
                AxiosInstance.delete(`/api/Categories/${id}`)
                    .then(() => {
                        setList(prevList => prevList.filter(item => item.id !== id));
                        Swal.fire('Видалено!', 'Категорія була успішно видалена.', 'success');
                    })
                    .catch(err => {
                        console.error("Помилка при видаленні", err);
                        Swal.fire('Помилка', 'Не вдалося видалити категорію.', 'error');
                    });
            }
        });
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-center">Категорії</h1>
                <button
                    className="btn btn-lg btn-success d-flex align-items-center gap-2 px-4 py-2"
                    style={{
                        transition: 'all 0.3s ease',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={() => navigate('Create')}>
                    <span style={{fontWeight: 'bold'}}>Додати категорію</span>
                </button>
            </div>
            {list.length === 0 ? <h2>Список пустий</h2> :
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Назва</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        list.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td><img src={`${BASE_URL}/images/200_${item.image}`} alt={item.name} width={75}/></td>
                                <td className={"align-middle"}>
                                    <div className={"d-flex justify-content-center gap-5"}>
                                    <button className="btn btn-lg btn-warning me-2" onClick={() => handleEdit(item.id)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-lg btn-danger" onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </button>
                                    </div>
                                </td>
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