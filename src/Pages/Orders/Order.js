import { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import "./Order.css"

export function Order(){

    const {items:{order}}=useContext(DataContext);
    const { amount, paymentId, delivery, products }=order;

    return (
        <div className="summary-wrapper">
          {
            <>
              <h3>Order Summary</h3>
              <div className="summary-container">
                <h3 className="summary-header ">Order Confirmed</h3>
                <div className="summary-main">
                  <div className="summary-left">
                    <h4>
                      Payment Id : <span>{paymentId}</span>
                    </h4>
                    <h4>
                      Total Amount : <span>₹ {amount}</span>
                    </h4>
                    <div className="order-address">
                      <h4>Order will be delivered to :</h4>
                      <p>{delivery.name}</p>
    
                      <p className="paragraph-sm">
                        {delivery.street}, {delivery.city} ,
                      </p>
                      <p className="paragraph-sm">
                        {delivery.state} ,{delivery.country}. {delivery.zipCode}
                      </p>
                      <p className="paragraph-sm">Phone Number : {delivery.mobile}</p>
                    </div>
                  </div>
                  <div className="summary-right">
                    {products.map(({ img, name, author, price, qty }) => (
                      <div className="card horizontal-container">
                        <div className="card-horizontal">
                          <img className="card-img horizontal-img" src={img} alt={name} />
                          <div className="card-info">
                            <div className="card-title">
                              <div>
                                <h4>{name}</h4>
                                <p className="card-description">{author}</p>
                              </div>
                            </div>
                            <div className="price">
                              <p>Total Quantity : {qty}</p>
                              <p>Price : ₹ {price}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          }
          </div>
    );
}