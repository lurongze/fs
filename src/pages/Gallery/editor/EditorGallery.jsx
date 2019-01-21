import React, { Component } from 'react';
import { Message, Form, Radio, Input, Loading } from '@alifd/next';
import Uploader  from '../../../components/Uploader';
import request from '../../../utils/request';

const FormItem = Form.Item;

export default class EditorGallery extends Component {

  static displayName = 'EditorGallery';

  constructor(props) {
    super(props);
    const categories = [{ value: '笑话', label: '笑话' } , { value: 'cosplay', label: 'cosplay' }];
    this.state = {
      categories: categories,
      selectCategory: categories[0].value,
      loading: false,
      detailData: {}
    };
  }

  componentDidMount() {
  }

  getDetail = (id) => {

  }

  handleSubmit = (data) => {
    console.log('data', data)
    const files = this.refs.uploader.getFiles();
    const covers = files.filter((item, index) => {
      return index < 9;
    }).map((item) => {
      return item.url;
    })
    const ids = files.map((item) => {
      return item.id;
    })

    const formData = {
      ...data, ...{ covers: covers.join(','), ids: ids.join(',')}
    }

    console.log('formData', formData);
    this.setState({
      loading: true
    });
    request.put('/gallery', formData).then((res) => {
      if (res.code === 200 ) {
        Message.success('保存成功');
        this.props.history.push('/gallery');
      } else {
        Message.error('保存失败');
      }
    }).finally(() => {
      this.setState({
        loading: false
      });
    });
  }

  radioChange = (selectCategory) => {
    this.setState({
      selectCategory
    })
  }


  render() {
    const { loading, categories, selectCategory} = this.state;
    return (
      <div className="card-bg">
        <Loading visible={loading} shape="fusion-reactor" style={{display: 'block'}}>
          <Form style={{width: '60%'}}>
            <FormItem label="图片">
              <Uploader ref={'uploader'}/>
            </FormItem>
            <FormItem label="分类:">
              <Radio.Group dataSource={categories} value={selectCategory} name="category" onChange={this.radioChange} />
            </FormItem>
            <FormItem label="描述:" required >
              <Input.TextArea name="title" placeholder="输入描述"/>
            </FormItem>
            <FormItem label=" ">
              <Form.Submit onClick={this.handleSubmit}>提交</Form.Submit>
            </FormItem>
          </Form>
        </Loading>
      </div>
    );
  }
}
