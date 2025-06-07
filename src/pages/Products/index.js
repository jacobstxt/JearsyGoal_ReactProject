import {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {BASE_URL} from "../../api/apiConfig";
import {Card,Button,Col,Row,Spinner,Container} from "react-bootstrap";


const ProductsPage = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [groupedProducts, setGroupedProducts] = useState([]);
    const  navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get("/api/Products")
            .then(res => {
                const { data } = res;
                console.log('Get list of products', data);
                setList(data);
                groupBySlug(data);
            })
            .catch(err => console.error('Error loading products', err))
            .finally(() => setLoading(false));
    }, []);

    const groupBySlug = (items) => {
        const grouped = Object.values(items.reduce((acc, item) => {
            if (!acc[item.slug]) {
                acc[item.slug] = {
                    ...item,
                    sizes: [],
                };
            }
            acc[item.slug].sizes.push({
                sizeName: item.productSize?.name,
                price: item.price,
                id: item.id
            });
            console.log("acc",acc);
            return acc;

        }, {}));

        setGroupedProducts(grouped);
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <Container className="my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-center">Продукти</h1>
                <button
                    className="btn btn-lg btn-success d-flex align-items-center gap-2 px-4 py-2"
                    style={{
                        transition: 'all 0.3s ease',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={() => navigate('Create')}>
                    <span style={{fontWeight: 'bold'}}>Додати продукт</span>
                </button>
            </div>

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {groupedProducts.map(product => (
                <Col key={product.slug}>
                    <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                        <div className="overflow-hidden">
                            <Card.Img
                                variant="top"
                                src={`${BASE_URL}/images/800_${product.productImages?.[0]?.name}`}
                                alt={product.name}
                                style={{
                                    objectFit: 'cover',
                                    height: '200px',
                                    transition: 'transform 0.3s ease'
                                }}
                                className="card-img-top"
                            />
                        </div>
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="fw-bold fs-5">{product.name}</Card.Title>

                            <div className="mb-3">
                                {product.sizes?.map((size, index) => (
                                    <div key={index} className="d-flex justify-content-between text-muted small">
                                        <span>{size.sizeName} см</span>
                                        <strong>{size.price} грн</strong>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <Link to={`product/${product.id}`} className="btn btn-outline-success w-100">
                                    Переглянути
                                </Link>
                                <Link to={`edit/${product.id}`} className="btn btn-outline-success mt-2 w-100">
                                    Редагувати
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
        </Container>
    );


};

export default ProductsPage;