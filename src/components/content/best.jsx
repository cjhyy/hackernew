import React, { Component } from 'react'

import moment from 'moment';
// import PropTypes from 'prop-types'
import axios from 'axios'
import { Spin, Icon } from 'antd';
import './style.css'

import MyCard from './card';
const antIcon = <Icon type="loading" style={{ fontSize: 80 }} spin />;

export default class Best extends Component {

    state ={
        startindex:[],
        loading:false,
        users:[],
        errorMsg:null
    }

    componentDidMount() {
        
        this.setState({
           
            loading:true,
        })
        const url=`https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty`
        axios.get(url)
        .then(Response =>{
            const result=Response.data
       
            const users=result
           const startindex=users.slice(0,50)
            this.setState({
                loading:false,
                users,
                startindex
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
    // handleScroll=() => {
    //      const {users} =this.state  
    //     // const ele = rdom.findDOMNode(this)
    //     // console.log(ele.scrollHeight,ele.clientHeight)
    //     // //   if(ele.scrollTop + ele.clientHeight >= ele.scrollHeight) {
         
    //     // //     console.log("scrolling down")
    //     // //   }
    //      let clientHeight = this.refs.Box.clientHeight; //可视区域高度
    // let scrollTop  = this.refs.Box.scrollTop;  //滚动条滚动高度
    // let scrollHeight = this.refs.Box.scrollHeight; //滚动内容高度
    // if((clientHeight+scrollTop)==(scrollHeight-14)){ 
    //     const startindex=users.slice(0,50)
    //     this.setState({
    //         // loading:true,
    //         startindex
    //     })
    //     console.log(clientHeight,scrollTop,  scrollHeight)
    //     }
    //     // console.log(clientHeight,scrollTop,  scrollHeight)
    // } 
       
    render() {
           const {loading,users,errorMsg,startindex} =this.state  

         
        if (loading){
            return <Spin className="loading" indicator={antIcon} />
        } else if (errorMsg){
            return <h3>{ errorMsg}</h3>
        } else{

        
        return (
            
            <div className="row" onWheel={this.handleScroll} ref="Box">
              {
                 
                startindex.map( (use,index)=> <MyCard id={use} key={index} >aa</MyCard>)
                  
              }
                 
                      
                  
                  
                       
         
            </div> 
         
        );
    }
    }
}