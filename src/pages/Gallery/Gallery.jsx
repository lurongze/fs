import React, { Component } from 'react';
import { Table, Pagination, Button, Upload } from '@alifd/next';

import saveToCOS from '../../utils/upload';
import request from '../../utils/request';

export default class Gallery extends Component {

  static displayName = 'Gallery';

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
    request.get(`/gallery/new/${page}/${size}`)
      .then((res) => {
        if (res.code === 200) {
          const list = res.data.list.map((item) => {
            return { ...item, ...{ publishTime: '2019-01-23 10:20:20' }};
          });

          this.setState({
            dataSource: list || [],
            total: res.data.total
          })
        }
      }).finally(() => {
      this.setState({
        loading: false
      })
    })
  }

  removeById = (id) => {
    console.log('removeById', id);
  }

  userRender = (value, index, record) => {
    return (
      <React.Fragment>
        <img src={record.avatar} style={{display: 'block', width: '30px', height: '30px'}} />
        <text>{record.nickname}</text>
      </React.Fragment>
    )
  }

  actionsRender = (value, index, record) => {
    return (
      <React.Fragment>
        <Button type='primary' onClick={this.removeById.bind(this, value)}>删除</Button>
      </React.Fragment>
    )
  }

  uploadFile = async (value) => {
    console.log('uploadFile', value);
    await saveToCOS(value);
  }

  render() {
    const { dataSource, loading, total} = this.state;
    return (
      <div className="card-page">


        <Upload
          listType="image"
          action="http://127.0.0.1:8088/upload"
          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
          withCredentials={false}
          formatter={(res) => {
            // 函数里面根据当前服务器返回的响应数据
            // 重新拼装符合组件要求的数据格式
            console.log('res', res)
            return res.data
          }}
        >
          <Button type="primary" style={{margin: '0 0 10px'}}>Upload File</Button>
        </Upload>

        <Table dataSource={dataSource} loading={loading}>
          <Table.Column title="Id" dataIndex="id"/>
          <Table.Column title="发布者" cell={this.userRender} />
          <Table.Column title="发布时间" dataIndex="publishTime"/>
          <Table.Column title="操作" dataIndex="id" cell={this.actionsRender} />
        </Table>
        <div style={{marginTop: '15px'}}>
          <Pagination defaultCurrent={1} onChange={this.pageChange} total={total} />
        </div>
      </div>
    );
  }
}
