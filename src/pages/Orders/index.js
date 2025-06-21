import {useEffect, useState} from "react";
import AxiosInstance from "../../api/axiosInstance";
import {BASE_URL} from "../../api/apiConfig";


const  OrdersPage = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        AxiosInstance.get("api/Order/list")
            .then(res => {
                const {data} = res;
                console.log("Get list of Orders", data);
                setList(data);
            })
            .catch(err => console.log("Problem", err));
        console.log('UseEffect APP', "Викликаємо після рендера");
    },[]);

    return(
      <>
          <div className="container mt-4">
              <h3>Ваші замовлення</h3>
              {list.length === 0 && <p>Замовлень немає.</p>}
              {list.map((order) => (
                  <div key={order.id} className="card mb-4 shadow-sm">
                      <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                              <h5 className="card-title mb-0">Замовлення #{order.id}</h5>
                              <span className="badge bg-primary">{order.status}</span>
                          </div>

                          <p className="text-muted small mb-3">
                              {new Date(order.dateCreated).toLocaleString()}
                          </p>

                          {order.orderItems.map((item, index) => (
                              <div key={index} className="d-flex align-items-center border-top pt-3 mb-3">
                                  <img
                                      src={`${BASE_URL}/images/200_${item.productImage}`}
                                      alt={item.productName}
                                      className="rounded me-3"
                                      style={{ width: "110px", height: "80px", objectFit: "cover" }}
                                  />
                                  <div className="flex-grow-1">
                                      <h6 className="mb-1">{item.productName}</h6>
                                      <small className="text-muted">
                                          Кількість: {item.count} × {item.priceBuy} грн
                                      </small>
                                  </div>
                                  <strong>{item.count * item.priceBuy} грн</strong>
                              </div>
                          ))}

                          <hr />
                          <div className="d-flex justify-content-between">
                              <strong>Загальна сума:</strong>
                              <strong>{order.totalPrice} грн</strong>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </>
    );


}

export default OrdersPage;