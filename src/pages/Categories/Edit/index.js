import {useNavigate, useParams} from "react-router-dom";
import BaseTextInput from "../../../components/common/BaseTextInput";
import AxiosInstance from "../../../api/axiosInstance";
import {useEffect, useState} from "react";
import BaseFileInput from "../../../components/common/BaseFileInput";
import {BASE_URL} from "../../../api/apiConfig";
import Swal from 'sweetalert2';

import * as Yup from "yup";
import {useFormik} from "formik";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Назва є обов'язковою"),
    slug: Yup.string().required("Слаг є обов'язковим"),
});


const EditPage = () => {
    const { id } = useParams();
    const [data, setData] = useState({ id: null, name: "", slug: "", image: "", preview: null });
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            name: "",
            slug: "",
            imageFile: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append("id", data.id);
                formData.append("name", values.name);
                formData.append("slug", values.slug);

                if (data.image && typeof data.image !== "string") {
                    formData.append("image", data.image);
                }

                await AxiosInstance.put(`/api/Categories`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                await Swal.fire({
                    icon: 'success',
                    title: 'Успіх',
                    text: 'Категорію успішно оновлено!',
                    timer: 2000,
                    showConfirmButton: false,
                });
                navigate("/Categories")
            } catch (error) {
                console.error("Send request error", error);
                const serverErrors = {};
                if (error.response?.data?.errors) {
                    Object.entries(error.response.data.errors).forEach(([key, messages]) => {
                        const field = key.charAt(0).toLowerCase() + key.slice(1);
                        serverErrors[field] = messages.join(" ");
                    });
                }
                formik.setErrors(serverErrors);

                await Swal.fire({
                    icon: 'error',
                    title: 'Помилка',
                    text: 'Не вдалося оновити категорію. Перевірте введені дані.',
                });
            }
        }
    });


    const {values, handleSubmit, errors, touched,setValues} = formik;

    useEffect(() => {
        AxiosInstance.get(`/api/Categories/${id}`)
            .then(res => {
                const category = res.data;
                setData(category);
                console.log(res.data);
                setValues({
                    name: category.name || "",
                    slug: category.slug || "",
                    imageFile: null
                });
            })
            .catch(err => {
                console.error("Помилка при завантаженні категорії", err);
            });
    }, [id,setValues]);








    // const handleFormikSubmit = async (values) => {
    //     console.log("Submit formik", values);
    //     try {
    //         const formData = new FormData();
    //         formData.append("name", values.name);
    //         formData.append("slug", values.slug);
    //         formData.append("image", values.imageFile);
    //
    //         await axiosInstance.post(`/api/Categories`, formData,
    //             {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                     "Accept": "*/*"
    //                 }
    //
    //             });
    //         navigate("..");
    //
    //     } catch(error) {
    //         //Що з цим робити і як робити на сервері
    //         console.error("Send request error", error);
    //
    //         const serverErrors = {};
    //         const{response}= error;
    //         const {data} = response;
    //         if(data){
    //             const {errors} = data;
    //             Object.entries(errors).forEach(([key, messages]) => {
    //                 let messageLines = "";
    //                 messages.forEach(message => {
    //                     messageLines += message+" ";
    //                     console.log(`${key}: ${message}`);
    //                 });
    //                 const field = key.charAt(0).toLowerCase() + key.slice(1);
    //                 serverErrors[field] = messageLines;
    //
    //             });
    //         }
    //
    //         console.log("response", response);
    //         console.log("serverErrors", serverErrors);
    //         setErrors(serverErrors);
    //     }
    // }



    return (
        <>
            <div className="container mt-5">
                <div className="card shadow rounded-4 p-4">
                    <h2 className="text-center mb-4 text-black">Редагування категорії</h2>
                    <form onSubmit={handleSubmit} className="col-md-8 offset-md-2">
                        <BaseTextInput
                            label={"Назва"}
                            field={"name"}
                            error={errors.name}
                            touched={touched.name}
                            value={values.name}
                            onChange={formik.handleChange}
                        />

                        <BaseTextInput
                            label={"Slug"}
                            field={"slug"}
                            error={errors.slug}
                            touched={touched.slug}
                            value={values.slug}
                            onChange={formik.handleChange}
                        />

                        <div className="d-flex align-items-center gap-3 mt-3">
                        <BaseFileInput
                            label={"Оберіть фото"}
                            field={"imageFile"}
                            error={errors.imageFile}
                            touched={touched.imageFile}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (data.preview) {
                                    URL.revokeObjectURL(data.preview);
                                }
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