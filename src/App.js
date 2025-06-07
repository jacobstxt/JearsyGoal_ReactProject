import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import CategoriesPage from "./pages/Categories";
import {Route, Routes} from "react-router-dom";
import CreatePage from "./pages/Categories/Create";
import NoMatch from "./pages/NoMatch";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import EditPage from "./pages/Categories/Edit";
import LoginPage from "./pages/Account/Login";
import {useAuthStore} from "./store/authStore";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import ProductsPage from "./pages/Products";
import ProductPage from "./pages/Products/Product";
import CreateProductPage from "./pages/Products/Create";
import EditProductPage from "./pages/Products/Edit";
const App = () => {


    const { setUser } = useAuthStore((state) => state);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        }
    },[]);


return (
    <>
        <Layout></Layout>
        <div className={"container mt-5"}>
            <Routes>
                <Route index element={<HomePage/>}/>


                <Route path={"Categories"}>
                <Route index element={<CategoriesPage/>}></Route>
                <Route path={"create"} element={<CreatePage/>}></Route>
                <Route path={"edit/:id"} element={<EditPage/>}></Route>

                </Route>


                <Route path={"Products"}>
                    <Route index element={<ProductsPage/>}></Route>
                    <Route path={"product/:id"} element={<ProductPage/>} />
                    <Route path={"create"} element={<CreateProductPage/>} />
                    <Route path={"edit/:id"} element={<EditProductPage/>} />
                </Route>


                <Route path={"Account"}>
                    <Route path={"login"} element={<LoginPage/>}></Route>
                </Route>


                <Route path="*" element={<NoMatch/>}></Route>
            </Routes>
       </div>
    </>
    )

}

export default App;
