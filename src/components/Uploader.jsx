import React, { Component } from 'react';
import { Upload } from '@alifd/next';
import request from '../utils/request';

export default class Gallery extends Component {

  static displayName = 'Uploader';

  static defaultProps = {
    limit: 100,
    title: '上传图片',
    action: 'http://127.0.0.1:8088/upload',
    listType: 'card',
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
      files: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value.length > 0) {
      this.setState({
        files: nextProps.value
      })
    }
  }

  componentDidMount() {
  }

  onSuccess = (res, files) => {
    console.log('files', files);
    this.setState({
      files
    })
  }

  onRemove = (res) => {
    console.log('onRemove', res, this.state.files);

    this.removeFromServer(res.response);
    const files = this.state.files.filter((item) => {
      return item.url !== res.url;
    })
    this.setState({
      files
    })
  }

  removeFromServer = (data) => {
    request.delete(`/upload/${data.id}`);
  }

  getFiles = () => {
    return this.state.files.map((item) => {
      return {
        id: item.response.id,
        url: item.response.url
      }
    })
  }

  render() {
    const { files } = this.state;
    const { defaultValue, title, action, accept, withCredentials, formatter, listType, limit, detailId, authorId } = this.props;
    return (
        <Upload.Card
          defaultValue={defaultValue}
          multiple={limit > 1}
          value={files}
          listType={listType}
          action={`${action}/${detailId}/${authorId}`}
          accept={accept}
          withCredentials={withCredentials}
          formatter={formatter}
          limit={limit}
          onSuccess={this.onSuccess}
          onRemove={this.onRemove}
        >
          <div className="next-upload-text">
            {title}({files.length}/{limit}张)
          </div>
        </Upload.Card>
    );
  }
}
