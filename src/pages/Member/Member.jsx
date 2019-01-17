import React, { Component } from 'react';
import { Table, Pagination } from '@alifd/next';

import request from '../../utils/request';

export default class Member extends Component {

  static displayName = 'Member';

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [],
      size: 20
    };
  }

  componentDidMount() {
    this.getList(1)
  }

  pageChange = (value) => {
    this.getList(value)
  }

  getList = (page) => {
    const { size } = this.state;
    this.setState({
      loading: true
    });
    request.get(`/member/${page}/${size}`)
      .then((res) => {
        if (res.code === 200) {
          this.setState({
            dataSource: res.data.list || [],
            total: res.data.total
          })
        }
      }).finally(() => {
      this.setState({
        loading: false
      })
    })
  }

  avatarRender = (image) => {
    return (
      <img src={image} style={{display: 'block', width: '30px', height: '30px'}} />
    )
  }

  render() {

    const { dataSource, loading, total} = this.state;

    return (
      <div className="login-page" >
        <Table dataSource={dataSource}
               loading={loading}>
          <Table.Column title="Id" dataIndex="id"/>
          <Table.Column title="昵称" dataIndex="nickname" />
          <Table.Column title="时间" dataIndex="register_time"/>
          <Table.Column title="头像" dataIndex="avatar" cell={this.avatarRender} />
        </Table>
        <Pagination defaultCurrent={1} onChange={this.pageChange} total={total} />
      </div>
    );
  }
}
