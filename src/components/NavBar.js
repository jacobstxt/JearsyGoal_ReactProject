import { NavLink } from "react-router-dom";

const NavBarPage = ()=> {


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className={"container"}>

                <NavLink className="navbar-brand" to={"/"}>Admin Panel</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <NavLink to="/create"  className={"nav-link"} >Add Category</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBarPage;