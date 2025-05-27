import { Link } from 'react-router-dom';

const NoMatch = () => {
    return (
            <div style={{
                    height: "100vh",
                    background: "linear-gradient(135deg, #f8f9fa)",
                }}
                className="d-flex flex-column align-items-center text-center px-3">

                <div className="mt-5 bg-white shadow-lg rounded-4 p-5">
                    <h1 className="display-1 fw-bold text-danger">404</h1>
                    <p className="fs-4 mb-3">
                        <span className="text-danger">Упс!</span> Сторінку не знайдено.
                    </p>
                    <p className="lead mb-4">
                        Можливо, ви ввели неправильну адресу або сторінку було переміщено.
                    </p>
                    <Link to="/" className="btn btn-outline-primary btn-lg px-4">
                        На головну
                    </Link>
                </div>

            </div>
    );
};

export default NoMatch;