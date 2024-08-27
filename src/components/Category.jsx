// Category.js remains similar but imports and uses Category.module.css
import React from 'react';
import styles from './Category.module.css';

const Category = ({ category, onAddWidget, onRemoveWidget }) => {
  return (
    <div className={styles.categoryContainer}>
      <h2 className={styles.categoryHeader}>{category.name}</h2>
      {/* Rest of the component */}
    </div>
  );
};

export default Category;
