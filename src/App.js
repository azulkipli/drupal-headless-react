import React, { Component } from 'react';
import logo from './logo.svg';
import logo_full from './logo_full.png';
import './App.css';

// Import antd components
import { Layout, Menu, Icon, Row, Col, Card, Pagination } from 'antd';
const { Header, Sider, Content, Footer } = Layout;

import axios from 'axios';

// let mockup_vouchers = 'http://www.mocky.io/v2/58a643a70f00006c06ac64bf';
// let mockup_banner = 'http://www.mocky.io/v2/58a67eb50f0000b80bac651b';

class App extends Component {

  state = {
      collapsed: true,
      vouchers: [],
      loading: true,
      page: 1,
      limit: 8,
      countVoucher: 28
    };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  changePage = (page) => {
    // console.log('page',page);
    this.setState({page: page});
    this.getVoucher(page);
  }

  getVoucher = (page) => {
    let header = {
      headers: {
        'content-type': 'application/json',
      },
    };
    let newpage = (page>0) ? page : this.state.page;
    let limit = this.state.limit;
    axios.get('http://localhost:3000/vouchers?_page='+page+'&_limit='+limit,header).then((res) => {
      console.log('vouchers',res.data);
      if(Array.isArray(res.data)){
        this.setState({
          loading: false,
          vouchers: res.data,
          page: newpage
        });
      }
    }).catch((err) => {
      console.log('vouchers ERROR',err);
    });
  }

  componentDidMount = () => {
    this.getVoucher();
  }

  render() {

    // Build List Voucher
    let vouchers = [];
    if(this.state.vouchers.length>0){
      this.state.vouchers.map((voucher,key) => {
        vouchers.push(
          <Col xs={12} sm={10} md={8} lg={6} key={key} style={{textAlign: 'center'}} >
            <Card className="vouchers">
              <div className="vouchers-img">
                <img src={voucher.image} alt={voucher.title}/>
              </div>
              <div className="vouchers-title">
                <span>{voucher.title}</span>
              </div>
            </Card>
          </Col>
        );
        return true;
      });

    }

    return (
      <Layout id="mainlayout">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <img src={logo} className="App-logo" alt="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <img src={logo_full} className="logofull" alt="logo-full" />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: '50vh' }}>

            <Row gutter={16}>
            {(this.state.vouchers.length>0) ?
              vouchers
              : ''
            }
            </Row>

            <Pagination current={this.state.page} onChange={this.changePage} total={this.state.countVoucher} />

          </Content>
          <Footer>
            <Row>
              <Col span={12}>
                Sepulsa &copy; {new Date().getFullYear()} by Azul
              </Col>
            </Row>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
