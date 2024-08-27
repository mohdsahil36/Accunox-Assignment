import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = React.forwardRef(({ selectedCategoryName, availableWidgets, selectedWidgets, onCheckboxChange, onOk, onCancel }, ref) => {
  return (
    <>
      <div className={styles.sidebar} ref={ref}>
        <h6 className={styles['add-widget-heading']}>Add Widget</h6>
        <h6 className='py-3'>Personalize your dashboard by adding the following widgets-</h6>
        <p className={styles['category-name']}>{selectedCategoryName}</p>
        <ul className={styles.widgetList}>
          {availableWidgets.map((widget) => (
            <li key={widget.id} className={styles.widgetItem}>
              <input
                type="checkbox"
                checked={selectedWidgets.some((w) => w.id === widget.id)}
                onChange={() => onCheckboxChange(widget)}
                className={styles.widgetCheckbox}
              />
              {widget.name}
            </li>
          ))}
        </ul>
        <div className={styles.sidebarButtons}>
          <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
          <button onClick={onOk} className={styles.okButton}>OK</button>
        </div>
      </div>
    </>
  );
});

export default Sidebar;
