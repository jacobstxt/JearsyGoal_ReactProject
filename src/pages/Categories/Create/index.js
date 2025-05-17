import {useState} from "react";
import { NavLink } from "react-router-dom";
import {motion} from "framer-motion";
import axiosInstance from "../../../api/axiosInstance";
import BaseTextInput from "../../../components/common/BaseTextInput";
import BaseFileInput from "../../../components/common/BaseFileInput";


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

                <BaseTextInput
                    label={"Назва категорії"}
                    field={"name"}
                    onChange={handleChange}
                    placeHolder={"Введіть назву категорії"}
                />

                <BaseTextInput
                    label={"Url Slug"}
                    field={"slug"}
                    onChange={handleChange}
                    placeHolder={"Введіть slug категорії"}
                />



                <BaseFileInput
                  label={"URL зображення"}
                  field={"image"}
                  onChange={handleChange}
                />


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