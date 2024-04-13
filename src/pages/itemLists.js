import { useProductContext } from "../productContext";
//import { data } from "../assets/data";
import styles from "../styles/home.module.css";
import ItemCard from "./itemCard";

function ItemLists(props) {
  const { data } = useProductContext();

  const { search, category, priceRange } = props;

  return (
    <>
      <div className={styles.cardContainer}>
        {data
          .filter((item) => {
            return search.toLocaleLowerCase() === ""
              ? item
              : item.name.toLocaleLowerCase().includes(search);
          })
          .filter((item) => {
            return item.price <= priceRange;
          })
          .filter((item) => {
            return category === "none" ? item : item.category === category;
          })
          .map((item, index) => (
            <ItemCard key={index} item={item} />
          ))}
      </div>
    </>
  );
}

export default ItemLists;
