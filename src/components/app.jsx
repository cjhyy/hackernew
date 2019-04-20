import {Layout ,Button,Menu ,BackTop } from 'antd';
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
          <Layout >
      <Header className="head" >
         <h1 className="logo"   >Hacker News</h1>   
         <div className="list">
         <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']} className="" className="menu" >
             {
                tabs.map((tab,index) => (
                  <Menu.Item key={index}>
                        <MyNavlink to={tab} className="list-group-item" activeClassName="active" >{tab.toUpperCase()}</MyNavlink>
                        </Menu.Item>
                    ))
             }
           
             </Menu>
       
         </div>
        
      </Header>
      <Content className="main"   > 
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
   
    </Layout>
    
    <BackTop visibilityHeight="100" />
    
             </div>
        );
    }
}




export default withRouter(App);