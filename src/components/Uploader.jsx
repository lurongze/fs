import React, { Component } from 'react';
import { Table, Pagination, Button, Upload } from '@alifd/next';

export default class Gallery extends Component {

  static displayName = 'Uploader';

  static defaultProps = {
    limit: 1,
    title: 'Upload File',
    action: 'action',
    listType: '',
    accept: 'image/png, image/jpg, image/jpeg, image/gif, image/bmp',
    withCredentials: false,
    formatter: (res) => {
      // 函数里面根据当前服务器返回的响应数据
      // 重新拼装符合组件要求的数据格式
      return res.data
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [],
      size: 20
    };
  }

  componentDidMount() {
  }


  render() {
    const { dataSource, loading, total} = this.state;
    const { title, action, accept, withCredential, formatter, listType, limit } = this.props;
    return (
      <React.Fragment>
        <Upload
          multiple
          listType={listType}
          action={action}
          accept={accept}
          withCredentials={withCredential}
          formatter={formatter}
        >
          <Button type="primary" style={{margin: '0 0 10px'}}>{title}</Button>
        </Upload>
      </React.Fragment>
    );
  }
}