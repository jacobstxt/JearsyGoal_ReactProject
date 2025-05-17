import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import CategoriesPage from "./pages/Categories";
import NavBarPage from "./components/NavBar";
import {Route, Routes} from "react-router-dom";
import CreatePage from "./pages/Categories/create";

const App = () => {


return (
    <>
        <NavBarPage></NavBarPage>
        <div className={"container"}>
            <Routes>
                <Route path={"/"} element={<CategoriesPage/>}></Route>
                <Route path={"/create"} element={<CreatePage/>}></Route>
            </Routes>
        </div>

    </>
    )

}

export default App;
