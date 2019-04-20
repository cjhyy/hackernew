import {Layout ,Button } from 'antd';
import React, { Component } from 'react';
import MyNavlink from './my-nav-link'
import { NavLink,Switch,Route,Redirect,withRouter} from 'react-router-dom'
import moment from 'moment';
import './apps.css'
import New from './content/new'
import Top from './content/top'
import Ask from './content/ask'
import Show from './content/show'
import Best from './content/best'
import Job from './content/job'



const {
  Header, Footer, Content,
} = Layout;
const tabs = ['new', 'top', 'ask', 'show', 'best', 'job']
class App extends Component {

    render() {
        return (
          <div>
          <Layout>
      <Header className="head" >
         <h1 className="logo">Hacker News</h1>   
         <div className="list">
             {
                tabs.map(tab => (
                        <MyNavlink to={tab} className="list-group-item" >{tab.toUpperCase()}</MyNavlink>
                    ))
             }
           
       
         </div>
        
      </Header>
      <Content className="main"  > 
      <Switch>
    
    <Route path='/new' component={New} />
    <Route path='/top' component={Top} />
    <Route path='/ask' component={Ask} />
    <Route path='/show' component={Show} />
    <Route path='/best' component={Best} />
   <Route path='/job' component={Job} />
   <Redirect to="/new" />
 </Switch> 
      </Content>
      <Footer className="bot">Footer</Footer>
    </Layout>
               
             </div>
        );
    }
}




export default withRouter(App);