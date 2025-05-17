const HomePage = () => {
    return (
        <>
            <div className="container mt-5">
                <header className="text-center mb-4">
                    <h1>🍕 Sushi & Pizza Shop 🍣</h1>
                    <p className="lead">Смачно, швидко та з доставкою!</p>
                </header>

                <section className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img src="https://allolosos.com.ua/i/akcii/666ad3bdce921.jpg"
                                 className="card-img-top h-75" alt="Pizza" />
                            <div className="card-body">
                                <h5 className="card-title">Піца</h5>
                                <p className="card-text">Тільки найсвіжіші інгредієнти та італійські рецепти. Спробуй нашу Маргариту, Пепероні та Вегетаріанську піцу!</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img src="https://vilki-palki.od.ua/storage/img/00/d7/1708961134%D0%A0%D0%BE%D0%BB%D0%BB%D0%A4%D0%B8%D0%BB%D0%B0%D0%B4%D0%B5%D0%BB%D1%8C%D1%84%D0%B8%D1%8F%D0%9A%D0%BB%D0%B0%D1%81%D1%81%D0%B8%D0%BA.jpg"
                                 className="card-img-top h-75" alt="Sushi" />
                            <div className="card-body">
                                <h5 className="card-title">Суші</h5>
                                <p className="card-text">Класичні роли, сети та авторські комбінації. Замовляй суші прямо зараз!</p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="text-center mt-5">
                    <p>&copy; 2025 Sushi & Pizza Shop | Доставка по місту щодня з 10:00 до 22:00</p>
                </footer>
            </div>
        </>
    )
}

export default HomePage;