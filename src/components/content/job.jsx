import React, { Component } from 'react'

import moment from 'moment';
// import PropTypes from 'prop-types'
import axios from 'axios'
import { Spin, Icon } from 'antd';
import './style.css'

import MyCard from './card';
const antIcon = <Icon type="loading" style={{ fontSize: 80 }} spin />;
const rdom = require('react-dom'); 
export default class Job extends Component {

    state ={
        startindex:0,
        loading:false,
        users:[],
        errorMsg:null,
        textarr:[],
        reloading:false
    }

    componentDidMount() {
        
        this.setState({
           
            loading:true,
        })
        const url=`https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty`
        axios.get(url)
        .then(Response =>{
            const result=Response.data
       
            const users=result  
            const {startindex} =this.state      
            const textarr=users.slice(0,startindex+20)
            // const startindex =startindex+30
            this.setState({
                loading:false,
                users,
                startindex:startindex+20,
                textarr
            })
           
        })
        .catch(error =>{
            console.error(error);
            this.setState({
                loading:false,
                errorMsg:error.message
            })
        })
    }
    handleScroll=() => {
         const {users,startindex,reloading} =this.state  
        const event = rdom.findDOMNode(this)
        const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        const clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;
        const scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;
        const height = scrollHeight - scrollTop - clientHeight;
      
        if (height <= (400)) 
        { 
        const textarr=users.slice(0,startindex+10)
        // const startindex =startindex+30
        this.setState({
            reloading:true,
            startindex:startindex+10,
            textarr
        })
        setTimeout(
           () => this.setState({
                reloading:false
            }),500
        ) 
        }
       console.log(clientHeight,scrollTop,  scrollHeight)
    } 
      
    render() {
           const {loading,users,errorMsg,textarr,reloading} =this.state  
           var loadd;
           if (reloading) {
             loadd = <Spin className="reload" indicator={antIcon} />
           } else {
             loadd = null;
           }
         
        if (loading){
            return <Spin className="loading" indicator={antIcon} />
        } else if (errorMsg){
            return <h3>{ errorMsg}</h3>
        } else{

        
        return (
            
            <div className="row" onWheel={this.handleScroll} >
              {
                 
                textarr.map( (use,index)=> <MyCard id={use} key={index} ></MyCard>)
              
              }    
             {
                loadd
             }
            </div> 
         
        );
    }
    }
}