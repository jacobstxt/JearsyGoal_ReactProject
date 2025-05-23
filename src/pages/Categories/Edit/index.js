import {useNavigate, useParams} from "react-router-dom";
import BaseTextInput from "../../../components/common/BaseTextInput";
import AxiosInstance from "../../../api/axiosInstance";
import {useEffect, useState} from "react";
import BaseFileInput from "../../../components/common/BaseFileInput";
import {BASE_URL} from "../../../api/apiConfig";
import '../../../App.css';

const EditPage = () => {

    const { id } = useParams();
    const [data, setData] = useState({id:null, name: "", slug: "",image:"",preview:null});
    const [successMessage, setSuccessMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        AxiosInstance.get(`/api/Categories/${id}`)
            .then(res => {
                setData(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.error("Помилка при завантаженні категорії", err);
            });
    }, [id]);

    const  HandleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("id", data.id);
        formData.append("name", data.name);
        formData.append("slug", data.slug);

        // Якщо вибране нове фото — додаємо файл, інакше — ні
        if (data.image && typeof data.image !== "string") {
            formData.append("imageFile", data.image);
        }

        AxiosInstance.put(`/api/Categories`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(() => {
                setSuccessMessage("Категорію успішно редаговано!");
                setShowMessage(true);
                setTimeout(() => {
                    navigate("/Categories");
                }, 2000);

            })
            .catch(err => {
                console.error("Помилка при оновленні", err);
            });
    }


    return (
        <>
            <div className={`top-message ${showMessage ? "show" : ""}`}>
                {successMessage}
            </div>

            <div className="container mt-5">
                <div className="card shadow rounded-4 p-4">
                    <h2 className="text-center mb-4 text-black">Редагування категорії</h2>
                    <form onSubmit={HandleSubmit} className="col-md-8 offset-md-2">
                        <BaseTextInput
                            label={"Назва"}
                            field={"name"}
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />

                        <BaseTextInput
                            label={"Slug"}
                            field={"slug"}
                            value={data.slug}
                            onChange={(e) => setData({ ...data, slug: e.target.value })}
                        />

                        <div className="d-flex align-items-center gap-3 mt-3">
                        <BaseFileInput
                            label={"Оберіть фото"}
                            field={"imageFile"}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setData({
                                    ...data,
                                    image: file,
                                    preview: URL.createObjectURL(file)
                                });
                            }}
                        />

                        {data.preview ? (
                            <img src={data.preview} alt="Preview" width={150} className="mt-3 rounded shadow-sm d-block mx-auto" />
                        ) : data.image ? (
                            <img src={`${BASE_URL}/images/200_${data.image}`} alt="Preview" width={150} className="mt-3 rounded shadow-sm d-block mx-auto" />
                        ) : null}

                        </div>

                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-success px-4 py-2 fs-5 rounded-pill shadow-sm">
                                Зберегти зміни
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
};

export  default  EditPage;