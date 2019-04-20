import React, { Component } from 'react'
import {Card,Collapse ,Comment,Avatar,Tag ,Tooltip,Icon} from 'antd';
import PropTypes from 'prop-types'
import axios from 'axios'
import moment from 'moment';
import './card.css'
import Comments from './comment';
const Panel = Collapse.Panel;
export default class MyCard extends Component {
    state={
        loading:false,
        item:null,
        title:null,
        types:null,
        kids:[],
        url:null,
        time:null,
        by:null,
        score:null,
    }
    static propTypes ={
        id:PropTypes.number.isRequired,
     }
     componentDidMount(){
         const {id} = this.props
        this.setState({
           errorMsg:null,
            loading:true,
        })
        const url=`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        axios.get(url)
        .then(Response =>{
            const result=Response.data
     
            const item=result
            const title=item.title
            const types=item.type
            const kids=item.kids
          const score=item.score
          const url=item.url
          const time=item.time*1000
          const by=item.by
            this.setState({
                loading:false,
                item,
                title,
                types,
                kids,
                score,url,by,time
            })
             console.log(typeof time);
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
        const {time,title,types,kids,score,url,by}=this.state
       if (types == "job"){
        return (
            
          <Card className="item"
          title={<a href={url}>{title}</a>
           
              
              }
          extra={ <span>
       <span style={{ paddingLeft: 8, cursor: 'auto' }}>
         {score}
       </span>
         <Icon
           type="like"
        
         />
     
      
     </span> }
       
     >
     <Tag className="tag">By&nbsp;{
     by}
     </Tag>
     <Tag className="tag">{ moment(time).fromNow()} 
     </Tag>
     </Card>
        )}
        return (
            
           <Card className="item"
           title={<a href={url}>{title}</a>
            
               
               }
           extra={ <span>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
          {score}
        </span>
          <Icon
            type="like"
         
          />
      
       
      </span> }
        
      >
      <Tag className="tag">By&nbsp;{
      by}
      </Tag>
      <Tag className="tag">{ moment(time).fromNow()} 
      </Tag>
      
      <Collapse bordered={false}  className="comment"   >
    <Panel  bordered={false} header={<p className="content" >{(kids || []).length}&nbsp;comment</p>} key="1" className="comment-head" style={{  border: 0,}}  >
   {  
       (kids || []).map((kid,index) => <Comments id={kid}  aa={index} />)        
     }
    </Panel>
    </Collapse>
      </Card>
        )
    }
}
