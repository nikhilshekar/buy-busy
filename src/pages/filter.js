import { useState } from "react";

import styles from "../styles/home.module.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function Filter(props) {
  const { priceRange, setpriceRange, category, setCategory } = props;


  return (
    <>
      <div className={styles.filterContainer}>
        <h3 className={styles.filterHeading}>Filter</h3>
        <span>Price : {priceRange}</span>
        <input
          type="range"
          value={priceRange}
          min="100"
          max="50000"
          step="100"
          onChange={(e) => setpriceRange(e.target.value)}
        />
        <div className={styles.category}>
          <div>
            <input
              type="radio"
              name="category"
              value="men"
              onClick={() => setCategory("men")}
            />
            <label>&nbsp; Men's Clothing</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              value="women"
              onClick={() => setCategory("women")}
            />
            <label>&nbsp; Women's Clothing</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              value="jewellery"
              onClick={() => setCategory("jewellery")}
            />
            <label>&nbsp; Jewellery</label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              value="electric"
              onClick={() => setCategory("electric")}
            />
            <label>&nbsp; Electronics</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
