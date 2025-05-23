import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import CategoriesPage from "./pages/Categories";
import {Route, Routes} from "react-router-dom";
import CreatePage from "./pages/Categories/Create";
import NoMatch from "./pages/NoMatch";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import EditPage from "./pages/Categories/Edit";

const App = () => {


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

                <Route path="*" element={<NoMatch/>}></Route>
            </Routes>
       </div>
    </>
    )

}

export default App;
