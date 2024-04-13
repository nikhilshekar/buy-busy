import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../styles/home.module.css";
import { useProductContext } from "../productContext";
import { useEffect, useState } from "react";

function ItemCard(props) {
  const { name, image, price, category } = props.item;
  const { addToCart, isLoading } = useProductContext();
  const [buttonText, setButtonText] = useState("Add to Cart");

  function func1(event) {
    console.log(isLoading);
    isLoading ? setButtonText("Adding...") : setButtonText("Add to Cart");
  }

  return (
    <>
      <Card className={styles.card}>
        <Card.Img variant="top" src={image} className={styles.cardImage} />
        <Card.Body className={styles.cardBody}>
          <Card.Title>{name}</Card.Title>
          <Card.Title style={{ color: "#0f0" }}>&#x20b9; {price}</Card.Title>
          <Button
            variant="success"
            onClick={(event) => {
              func1(event);
              addToCart(props.item);
            }}
          >
            {buttonText}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default ItemCard;
