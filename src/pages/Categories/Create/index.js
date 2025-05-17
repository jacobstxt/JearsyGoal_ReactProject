import {useState} from "react";
import { NavLink } from "react-router-dom";
import {motion} from "framer-motion";
import axiosInstance from "../../../api/axiosInstance";


const  CreatePage=()=> {

    const [data, setData] = useState({ name: "", slug: "",image:""});
    const [response, setResponse] = useState(null);


    const handleChange = (event) => {
        const { name, type, value, files } = event.target;

        if (type === "file") {
            setData({ ...data, [name]: files[0] });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axiosInstance.post("/api/Categories", data,
            {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': '*/*'
            }
            })
            .then((response) => {
                setResponse({message:"Категорію успішно додано!", type:"success"});
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                setResponse({message:"Сталася помилка", type:"error"});
            });
    };


    return (
        <div className="container d-flex justify-content-center">
            <form  encType="multipart/form-data" onSubmit={handleSubmit} className="p-4 w-75 shadow rounded bg-light">
                <h4 className="mb-4 text-center">Створення категорії</h4>

                <div className="mb-3">
                    <label  className="form-label fw-semibold text-dark">Назва категорії</label>
                    <input  type="text" name={"name"} className="form-control"
                            placeholder="Введіть назву категорії"
                            required  onChange={handleChange} />
                    <span  className="text-danger"></span>
                </div>


                <div className="mb-3">
                    <label  className="form-label fw-semibold text-dark">Slug</label>
                    <textarea  className="form-control" name={"slug"} rows="2"
                               placeholder="Введіть slug категорії"  onChange={handleChange}>
                    </textarea>
                    <span  className="text-danger"></span>
                </div>


                <div className="mb-3">
                    <label  className="form-label fw-semibold text-dark">URL зображення</label>
                    <input  type="file" name={"image"} className="form-control"
                            accept="image/*" onChange={handleChange}/>
                    <span  className="text-danger"></span>
                </div>

                {
                    response &&
                    (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`alert mt-3 ${response.type === "success" ? "alert-success" : "alert-danger"}`}>
                            {response.message}
                        </motion.div>
                    )
                }

                <div className={"d-flex gap-2"}>
                    <button type="submit" className="btn btn-primary">Створити категорію</button>
                    <NavLink to={"/"}  className="btn btn-danger">Скасувати</NavLink>
                </div>

            </form>
        </div>

    )
}


export default CreatePage;