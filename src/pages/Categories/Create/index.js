import axiosInstance from "../../../api/axiosInstance";
import BaseTextInput from "../../../components/common/BaseTextInput";
import BaseFileInput from "../../../components/common/BaseFileInput";
import {useNavigate} from "react-router-dom";


import * as Yup from "yup";
import {useFormik} from "formik";


const validationSchema = Yup.object().shape({
    name: Yup.string().required("Назва є обов'язковою"),
    slug: Yup.string().required("Слаг є обов'язковим"),
    imageFile: Yup.mixed().required("Файл зображення є обов'язковим")
});


const  CreatePage=()=> {

    // const [data, setData] = useState({ name: "", slug: "",image:""});
    // const [response, setResponse] = useState(null);
    //
    //
    // const handleChange = (event) => {
    //     const { name, type, value, files } = event.target;
    //
    //     if (type === "file") {
    //         setData({ ...data, [name]: files[0] });
    //     } else {
    //         setData({ ...data, [name]: value });
    //     }
    // };
    //
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     await axiosInstance.post("/api/Categories", data,
    //         {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'Accept': '*/*'
    //             }
    //         })
    //         .then((response) => {
    //             setResponse({message:"Категорію успішно додано!", type:"success"});
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             setResponse({message:"Сталася помилка", type:"error"});
    //         });
    // };

    const initValues = {
        name: "",
        slug: "",
        imageFile: null,
    };


    const handleFormikSubmit = async (values) => {
        console.log("Submit formik", values);
        try {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("slug", values.slug);
              formData.append("image", values.imageFile);

              await axiosInstance.post(`/api/Categories`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Accept": "*/*"
                    }

                });
            navigate("..");

        } catch(error) {
            //Що з цим робити і як робити на сервері
            console.error("Send request error", error);

            const serverErrors = {};
            const{response}= error;
            const {data} = response;
            if(data){
                const {errors} = data;
                Object.entries(errors).forEach(([key, messages]) => {
                    let messageLines = "";
                    messages.forEach(message => {
                        messageLines += message+" ";
                        console.log(`${key}: ${message}`);
                    });
                    const field = key.charAt(0).toLowerCase() + key.slice(1);
                    serverErrors[field] = messageLines;

                });
            }

            console.log("response", response);
            console.log("serverErrors", serverErrors);
            setErrors(serverErrors);
        }
    }

    const formik = useFormik({
        initialValues: initValues,
        onSubmit: handleFormikSubmit,
        validationSchema: validationSchema,
    });

    const {values, handleSubmit, errors, touched,setErrors, handleChange, setFieldValue,setFieldTouched} = formik;


    const navigate = useNavigate();

    const onHandleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setFieldValue("imageFile", files[0]);
        }
        else {
            setFieldValue("imageFile", null);
        }
        setFieldTouched("imageFile", true);
    }

    return (
      <>
          <div className="container mt-5">
              <div className="card shadow rounded-4 p-4">
                  <h2 className="text-center mb-4 text-black">Створення категорії</h2>
            <form onSubmit={handleSubmit} className={"col-md-8 offset-md-2"}>
                <BaseTextInput
                    label={"Оберіть назву"}
                    field={"name"}
                    error={errors.name}
                    touched={touched.name}
                    value={values.name}
                    onChange={handleChange}
                />

                <BaseTextInput
                    label={"Оберіть Slug"}
                    field={"slug"}
                    error={errors.slug}
                    touched={touched.slug}
                    value={values.slug}
                    onChange={handleChange}
                />

                <BaseFileInput
                    label={"Оберіть фото"}
                    field={"imageFile"}
                    error={errors.imageFile}
                    touched={touched.imageFile}
                    onChange={onHandleFileChange}
                />

                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-success px-4 py-2 fs-5 rounded-pill shadow-sm">
                        Додати
                    </button>
                </div>
             </form>

              </div>
          </div>
      </>

        // <div className="container d-flex justify-content-center">
        //     <form  encType="multipart/form-data" onSubmit={handleSubmit} className="p-4 w-75 shadow rounded bg-light">
        //         <h4 className="mb-4 text-center">Створення категорії</h4>
        //
        //         <BaseTextInput
        //             label={"Назва категорії"}
        //             field={"name"}
        //             onChange={handleChange}
        //             placeHolder={"Введіть назву категорії"}
        //         />
        //
        //         <BaseTextInput
        //             label={"Url Slug"}
        //             field={"slug"}
        //             onChange={handleChange}
        //             placeHolder={"Введіть slug категорії"}
        //         />
        //
        //
        //
        //         <BaseFileInput
        //             label={"URL зображення"}
        //             field={"image"}
        //             onChange={handleChange}
        //         />
        //
        //
        //         {
        //             response &&
        //             (
        //                 <motion.div
        //                     initial={{ opacity: 0, y: -20 }}
        //                     animate={{ opacity: 1, y: 0 }}
        //                     transition={{ duration: 0.5 }}
        //                     className={`alert mt-3 ${response.type === "success" ? "alert-success" : "alert-danger"}`}>
        //                     {response.message}
        //                 </motion.div>
        //             )
        //         }
        //
        //         <div className={"d-flex gap-2"}>
        //             <button type="submit" className="btn btn-primary">Створити категорію</button>
        //             <NavLink to={"/"}  className="btn btn-danger">Скасувати</NavLink>
        //         </div>
        //
        //     </form>
        // </div>
    )
}


export default CreatePage;