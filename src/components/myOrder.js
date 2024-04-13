import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom/dist";
import { useProductContext } from "../productContext";
import Table from "react-bootstrap/Table";
import Loading from "./loader";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function MyOrder() {
  const { myorders } = useProductContext();

  const [isLoading, setLoading] = useState(true);

  // hide the spinner after given time
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="App" style={{ margin: "0px 15%" }}>
      <h3 style={{ textAlign: "center", margin: "20px" }}>Your Orders</h3>
      <div style={{ marginTop: "30px" }}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {myorders.length == 0 ? (
              <>
                {/* message of no order */}
                <h4 className="mt-5" style={{ textAlign: "center" }}>
                  OOPS! You haven't placed any order yet
                  <Link to="/">
                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="primary"
                      size="lg"
                    >
                      Go back to Home Page
                    </Button>
                  </Link>
                </h4>
              </>
            ) : (
              <>
                {myorders.map((order, i) => (
                  <>
                    <h5 style={{ textAlign: "center" }}>
                      {" "}
                      Ordered on : {order.date}
                    </h5>
                    <Table striped bordered hover variant="secondary" key={i}>
                      <thead>
                        <tr>
                          <th>S.no</th>
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.list.map((product, i) => (
                          <tr>
                            <td>{i + 1}</td>
                            <td>{product.name}</td>
                            <td>₹{product.price}</td>
                            <td>x{product.qty}</td>
                            <td>₹{product.qty * product.price}</td>
                          </tr>
                        ))}

                        {/* last row to show total amount of the order */}
                        <tr>
                          <td colSpan={4}>
                            <strong>Grand Total</strong>
                          </td>
                          <td>
                            <strong>₹{order.amount}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MyOrder;
