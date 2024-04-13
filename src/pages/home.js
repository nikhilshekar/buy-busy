import styles from "../styles/home.module.css";
import { useState, useEffect } from "react";
import Filter from "./filter";
import ItemLists from "./itemLists";
import Loading from "../components/loader";

function Home() {
  const [search, setSearch] = useState("");

  const [priceRange, setpriceRange] = useState(50000);
  const [category, setCategory] = useState("none");

  const [isLoading, setLoading] = useState(true);

  // hide the spinner after given time
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className={styles.searchDiv}>
        <input
          type="text"
          placeholder="Search Item..."
          value={search}
          className={styles.searchInput}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.mainContent}>
        <>
          <Filter
            priceRange={priceRange}
            setpriceRange={setpriceRange}
            category={category}
            setCategory={setCategory}
          />
          <ItemLists
            search={search}
            category={category}
            priceRange={priceRange}
          />
        </>
      </div>
    </>
  );
}

export default Home;
