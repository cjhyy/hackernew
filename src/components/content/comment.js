import React, { Component } from 'react'
import {Card,Collapse ,Comment,Avatar,Tag ,Tooltip,Icon,Spin} from 'antd';
import PropTypes from 'prop-types'
import axios from 'axios'
import moment from 'moment';
const antIcon = <Icon type="loading" style={{ fontSize: 30 }} spin />;
export default class Comments extends Component {
    state={
        loading:false,
        item:null,
       del:false,
        text:null,
        time:null,
        by:null,
        
    }
    static propTypes ={
        id:PropTypes.number.isRequired,
     
        aa:PropTypes.number.isRequired
     }
     componentDidMount(){
        const {id} = this.props
       this.setState({
          errorMsg:null,
        loading:true
       })
       const url=`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
       axios.get(url)
       .then(Response =>{
           const result=Response.data
    
           const item=result
        const del=item.deleted
         const text=item.text
         const time=item.time*1000
         const by=item.by
           this.setState({
               loading:false,
               item,
               text,
        time,
        by,del
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
    render() {
        const { text,by,del,time,loading } = this.state
        const {aa} =this.props
  
        
        
        if(loading ){
            if( aa == "0"){
                return <Spin  indicator={antIcon} />
            } else return null
 

        } else
        if ( del ){
          return null
        } else
        return (
           
   <Comment
       author={<a>{by}</a>}
       
      
       datetime={(
         <Tooltip title={moment(time).format('YYYY-MM-DD HH:mm:ss')}>
           <span>{moment(time).fromNow()}</span>
         </Tooltip>
       )}
     > 
     <p dangerouslySetInnerHTML={{ __html:text}} />
     </Comment>
        )
    }
}
