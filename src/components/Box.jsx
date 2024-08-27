import React, { useState } from 'react';
import Widget from './Widget';
import Sidebar from './Sidebar';
import styles from './Box.module.css';

const Box = ({ category, onAddWidget, onRemoveWidget }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleAddWidget = () => {
    setShowSidebar(true);
  };

  const handleSelectWidget = (widget) => {
    onAddWidget(category.id, widget);
    setShowSidebar(false); // Close the sidebar after adding widget
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className={styles.box}>
      {category.widgets.length > 0 && (
        <>
          <h2>{category.name}</h2>
          <div className={styles.widgetGrid}>
            {category.widgets.map(widget => (
              <Widget
                key={widget.id}
                widget={widget}
                onRemove={() => onRemoveWidget(category.id, widget.id)}
              />
            ))}
          </div>
        </>
      )}
      <button onClick={handleAddWidget}>+ Add Widget</button>
      {showSidebar && ( 
        <Sidebar
        categories={category}  // Ensure categories is passed correctly
        onAddWidget={handleSelectCategory}
        onClose={handleCloseSidebar}
        />
      )}
    </div>
  );
};

export default Box;
