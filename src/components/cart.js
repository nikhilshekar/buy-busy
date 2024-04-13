import { useProductContext } from "../productContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import Loading from "./loader";

function Cart(props) {
  const {
    cart,
    item,
    total,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    purchaseAll,
  } = useProductContext();

  const [isLoading, setLoading] = useState(true);

  // hide the spinner after given time
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (isLoading?<Loading />:
    <>
      <Card
        body
        style={{
          width: "15rem",
          margin: "auto",
          marginTop: "10px",
          background: "#444",
          color: "white",
        }}
      >
        <div>Total Items : {item}</div>
        <div>Total Amount : &#x20b9; {total}</div>
        <div className="d-grid gap-2 mb-2 mt-4">
          <Button variant="danger" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
        <div className="d-grid gap-2">
          <Button variant="secondary" onClick={purchaseAll}>
            Purchase
          </Button>
        </div>
      </Card>
      <div className={styles.mainContent}>
        {item == 0 ? (
          <>
            <h4 className="mt-5" style={{ margin: "auto" }}>
              OOPS! Cart is Empty
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
            <br />
          </>
        ) : null}
        {cart.map((item, index) => {
          return (
            <Card className={styles.card} key={index}>
              <Card.Img
                variant="top"
                src={item.image}
                className={styles.cardImage}
              />
              <Card.Body className={styles.cardBody}>
                <Card.Title>{item.name}</Card.Title>
                <Card.Title
                  style={{ color: "#0f0", justifyContent: "space-between" }}
                  className={styles.mainContent}
                >
                  &#x20b9;{item.price}
                  <div>
                    <span
                      className={styles.minus}
                      onClick={() => decreaseQuantity(item)}
                    ></span>
                    {item.qty}
                    <span
                      className={styles.plus}
                      onClick={() => increaseQuantity(item)}
                    ></span>
                  </div>
                </Card.Title>
                <Button
                  variant="danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove from cart
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default Cart;
