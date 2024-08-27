import React, { useState, useEffect, useRef } from 'react';
import { FaRepeat } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import Grid from './components/Grid';
import Sidebar from './components/Sidebar';
import './App.css';
import Navbar from './components/Navbar';

const initialCategories = [
  {
    id: 'c1',
    name: 'Cloud Accounts',
    widgets: [],
    availableWidgets: [
      { id: 'w1', name: 'Pie Chart 1', chartType: 'pie', data: [10, 20, 30] },
      { id: 'w2', name: 'Bar Chart 1', chartType: 'bar', data: [30, 20, 10] },
    ],
  },
  {
    id: 'c2',
    name: 'Cloud Account Risk Management',
    widgets: [],
    availableWidgets: [
      { id: 'w4', name: 'Bar Chart 2', chartType: 'bar', data: [15, 25, 35] },
      { id: 'w5', name: 'Pie Chart 3', chartType: 'pie', data: [25, 35, 15] },
    ],
  },
  {
    id: 'c3',
    name: 'Image Risk Assessment',
    widgets: [],
    availableWidgets: [
      { id: 'w6', name: 'Bar Chart 3', chartType: 'bar', data: [5, 15, 25] },
      { id: 'w7', name: 'Pie Chart 4', chartType: 'pie', data: [35, 25, 5] },
    ],
  },
];

function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const sidebarRef = useRef(null);

  const handleAddWidget = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedWidgets([]);
    setIsSidebarVisible(true);
  };

  const handleCheckboxChange = (widget) => {
    setSelectedWidgets((prevSelected) =>
      prevSelected.includes(widget)
        ? prevSelected.filter((w) => w !== widget)
        : [...prevSelected, widget]
    );
  };

  const handleOkClick = () => {
    if (selectedCategory) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === selectedCategory
            ? {
                ...category,
                widgets: [
                  ...category.widgets,
                  ...selectedWidgets.filter(
                    (widget) => !category.widgets.some((w) => w.id === widget.id)
                  ),
                ],
                availableWidgets: category.availableWidgets.filter(
                  (widget) => !selectedWidgets.some((w) => w.id === widget.id)
                ),
              }
            : category
        )
      );
      setSelectedWidgets([]);
      setSelectedCategory(null);
      setIsSidebarVisible(false);
    }
  };

  const handleCancelClick = () => {
    setSelectedWidgets([]);
    setSelectedCategory(null);
    setIsSidebarVisible(false);
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter((widget) => widget.id !== widgetId),
              availableWidgets: [
                ...category.availableWidgets,
                ...initialCategories
                  .find((cat) => cat.id === categoryId)
                  .availableWidgets.filter((widget) => widget.id === widgetId),
              ],
            }
          : category
      )
    );
  };

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      handleCancelClick();
    }
  };

  useEffect(() => {
    if (isSidebarVisible) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarVisible]);

  const selectedCategoryName = selectedCategory
    ? categories.find((category) => category.id === selectedCategory)?.name
    : '';

  return (
    <div className="App">
      <Navbar/>
      <div className='d-flex align-items-center justify-content-between'>
        <div>
          <h5 className='dashboard-heading p-1 ps-3'>CNAPP Dashboard</h5>
        </div>
        <div>
          <button className='addWidget'>Add Widget +</button>
          <button className='icon'><FaRepeat /></button>
          <button className='icon'><SlOptionsVertical /></button>
        </div>
      </div>
      <div className="layout">
        <h5 className='executive-dashboard'>CSPM Exective Dashboard</h5>
        {isSidebarVisible && (
          <Sidebar
            ref={sidebarRef}
            selectedCategoryName={selectedCategoryName}
            availableWidgets={
              selectedCategory
                ? categories.find((category) => category.id === selectedCategory)
                    .availableWidgets
                : []
            }
            selectedWidgets={selectedWidgets}
            onCheckboxChange={handleCheckboxChange}
            onOk={handleOkClick}
            onCancel={handleCancelClick}
          />
        )}
        <Grid
          categories={categories}
          onAddWidget={handleAddWidget}
          onRemoveWidget={handleRemoveWidget}
        />
        <h5 className='executive-dashboard'>CWPP Dashboard</h5>
      </div>
    </div>
  );
}

export default App;
