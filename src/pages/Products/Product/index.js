import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "../../../api/axiosInstance";
import {BASE_URL} from "../../../api/apiConfig";
import {Spinner} from "react-bootstrap";
import "./Style.css";
import {useCartStore} from "../../../store/CartStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faShoppingCart} from "@fortawesome/free-solid-svg-icons";

const ProductPage = () => {
    const { id } = useParams();
    const [currentProduct, setProduct] = useState();
    const [allProducts, setAllProducts] = useState();
    const navigate = useNavigate();
    const items = useCartStore(state => state.items);

    const existingItem = currentProduct
        ? items.find(item => item.productId === currentProduct.id)
        : null;

    console.log("id",id);
    useEffect(() => {
        if (!id) return;

        axiosInstance.get(`/api/Products/id/${id}`)
            .then(res => {
                const current = res.data;
                setProduct(current);
                console.log("current",current);
                return axiosInstance.get(`/api/Products/slug/${current.slug}`);
            })
            .then(res => {
                const {data} = res;
                console.log("data",data);
                setAllProducts(data);
            })
            .catch(err => console.error("Error loading product", err));
    }, [id]);
    if (!currentProduct || !allProducts) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }


    const AddProduct = async () => {
        console.log("ADD",currentProduct.id);
        if (!existingItem) {
            await useCartStore.getState().addItem(currentProduct.id, 1);
        } else {
            console.log("Add existing", existingItem);
            await useCartStore.getState().addItem(currentProduct.id, existingItem.quantity + 1);
        }
    }

    // return (
    //     <div className=" col-md-9 offset-md-2 d-flex justify-content-center align-items-center" style={{ marginTop: "7%" }}>
    //         <div className="row">
    //
    //             <div className="col-md-6">
    //                 <div id="productCarousel" className="carousel slide" data-bs-ride="false">
    //
    //                     <div className="carousel-indicators">
    //                         {currentProduct?.productImages?.map((img, index) => (
    //                             <button
    //                                 key={img.id}
    //                                 type="button"
    //                                 data-bs-target="#productCarousel"
    //                                 data-bs-slide-to={index}
    //                                 className={index === 0 ? "active" : ""}
    //                                 aria-current={index === 0 ? "true" : undefined}
    //                             ></button>
    //                         ))}
    //                     </div>
    //
    //                     <div className="carousel-inner">
    //                         {currentProduct?.productImages?.map((img, index) => (
    //                             <div key={img.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
    //                                 <img
    //                                     src={`${BASE_URL}/images/800_${img.name}`}
    //                                     className="d-block w-300 rounded-3"
    //                                     alt={`Product slide ${index + 1}`}
    //                                 />
    //                             </div>
    //                         ))}
    //                     </div>
    //
    //                     <button
    //                         className="carousel-control-prev"
    //                         type="button"
    //                         data-bs-target="#productCarousel"
    //                         data-bs-slide="prev"
    //                     >
    //                         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //                     </button>
    //                     <button
    //                         className="carousel-control-next"
    //                         type="button"
    //                         data-bs-target="#productCarousel"
    //                         data-bs-slide="next"
    //                     >
    //                         <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //                     </button>
    //                 </div>
    //             </div>
    //
    //
    //             <div className="col-md-4 mb-5" style={{ marginLeft: "3%" }}>
    //                 <h2>{currentProduct.name}</h2>
    //                 <br/>
    //                 <h6 >Інгредієнти</h6>
    //
    //
    //                 <div className="d-flex flex-wrap ">
    //                     {currentProduct?.ingridients?.map((ing) => (
    //                         <div key={ing.id} className="d-flex align-items-center me-3 mb-2 border rounded-3 p-2">
    //                             <img
    //                                 src={`${BASE_URL}/images/200_${ing.image}`}
    //                                 alt={ing.name}
    //                                 width={20}
    //                                 height={20}
    //                                 className="me-2 rounded-circle"
    //                             />
    //                             <span>{ing.name}</span>
    //                         </div>
    //                     ))}
    //                 </div>
    //                 <br/>
    //
    //                 <div className="d-flex justify-content-between mt-3">
    //                     <div className={"fw-bold fs-4"}>Вага: {currentProduct.weight}г.</div>
    //                     <div className={"fw-bold fs-4"}><strong></strong>Ціна: {currentProduct.price}грн</div>
    //                 </div>
    //
    //
    //                 <div className="mt-4 d-flex flex-row flex-wrap align-items-center">
    //                     {allProducts.map(product => (
    //                         <div className="form-check me-3" key={product.id}>
    //                             <input
    //                                 className="form-check-input"
    //                                 type="radio"
    //                                 id={`size-${product.id}`}
    //                                 name="size"
    //                                 checked={product.id === currentProduct.id}
    //                                 onChange={() => navigate(`/products/product/${product.id}`)}
    //                             />
    //                             <label className="form-check-label" htmlFor={`size-${product.id}`}>
    //                                 {product.productSize?.name}
    //                             </label>
    //                         </div>
    //                     ))}
    //                 </div>
    //             </div>
    //
    //         </div>
    //     </div>
    // );

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div id="productCarousel" className="carousel slide shadow rounded-4 overflow-hidden" data-bs-ride="false">
                        <div className="carousel-inner">
                            {currentProduct?.productImages?.map((img, index) => (
                                <div key={img.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                    <img
                                        src={`${BASE_URL}/images/800_${img.name}`}
                                        className="d-block w-100"
                                        alt={`Product slide ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>

                <div className="col-md-5 mt-4 mt-md-0">
                    <div className="bg-light rounded-4 shadow-sm p-4">
                        <h2 className="fw-bold">{currentProduct.name}</h2>
                        <hr />

                        <h5 className="text-muted mb-3">Інгредієнти:</h5>
                        <div className="d-flex flex-wrap mb-3">
                            {currentProduct?.ingridients?.map((ing) => (
                                <div key={ing.id} className="d-flex align-items-center me-2 mb-2 p-2 bg-white shadow-sm rounded-pill">
                                    <img
                                        src={`${BASE_URL}/images/200_${ing.image}`}
                                        alt={ing.name}
                                        width={24}
                                        height={24}
                                        className="me-2 rounded-circle"
                                    />
                                    <span>{ing.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="d-flex justify-content-between mb-4">
                            <div className="fw-semibold fs-5">Вага: {currentProduct.weight} г</div>
                            <div className="fw-bold fs-5 text-success">Ціна: {currentProduct.price} грн</div>
                        </div>

                        <h6 className="mb-2">Обери розмір:</h6>
                        <div className="d-flex flex-wrap">
                            {allProducts.map(product => (
                                <div className="form-check me-3" key={product.id}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id={`size-${product.id}`}
                                        name="size"
                                        checked={product.id === currentProduct.id}
                                        onChange={() => navigate(`/products/product/${product.id}`)}
                                    />
                                    <label className="form-check-label" htmlFor={`size-${product.id}`}>
                                        {product.productSize?.name} см
                                    </label>
                                </div>
                            ))}
                        </div>

                        <button onClick={AddProduct} className="btn btn-success mt-4 d-flex align-items-center gap-2">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            Add to Cart
                            {existingItem && <FontAwesomeIcon icon={faCheckCircle} className="ms-2 text-white" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProductPage;