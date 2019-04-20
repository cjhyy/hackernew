import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './apps.css'
export default class MyNavlink extends Component {
    render() {
        return (
           <NavLink {...this.props} activeClassName="activeclass" />
           
        )
    }
}
