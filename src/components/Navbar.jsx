import React from 'react';
import { HiOutlineBellAlert } from "react-icons/hi2";
import classes from './Navbar.module.css';

export default function Navbar() {
    return (
        <div className="container-fluid">
            <div className="row align-items-center p-4 bg-white">
                <div className="breadcrumbs col-4 text-start">
                    <p className={classes.navigation}>Home {'>'} <span className={classes['current-page']}> Dashboard V2</span></p>
                </div>
                <div className='search-bar col-4 text-center'>
                    <input type="text" placeholder='Search Anything' className={classes['search-input']}/>
                </div>
                <div className='col-4 text-end'>
                    <button className={classes.icon}>
                        <HiOutlineBellAlert />
                    </button>
                </div>
            </div>
        </div>
    );
}
