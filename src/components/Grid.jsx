import React from 'react';
import Widget from './Widget';
import styles from './Grid.module.css';

const Grid = ({ categories, onAddWidget, onRemoveWidget }) => {
  return (
    <div className={styles.grid}>
      {categories.map(category => (
        <div
          key={category.id}
          className={`${styles.gridItem} ${category.widgets.length > 0 ? styles.hasWidgets : ''}`}
        >
          {category.widgets.length > 0 ? (
            <>
              <p className={styles.widgetHeading}>{category.name}</p>
              <div className={styles.widgetList}>
                {category.widgets.map(widget => (
                  <Widget
                    key={widget.id}
                    widget={widget}
                    onRemove={() => onRemoveWidget(category.id, widget.id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <button className={styles.addButton} onClick={() => onAddWidget(category.id)}>
              + Add Widget
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Grid;
