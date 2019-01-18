import React, { Component } from 'react';
import { Table, Pagination, Button, Form, Radio } from '@alifd/next';

import request from '../../utils/request';

const FormItem = Form.Item;

export default class EditorGallery extends Component {

  static displayName = 'EditorGallery';

  constructor(props) {
    super(props);
    const categories = [{ value: '笑话', label: '笑话' } , { value: 'cosplay', label: 'cosplay' }];
    this.state = {
      categories: categories,
      selectCategory: categories[0],
      loading: false,
      detailData: {}
    };
  }

  componentDidMount() {
  }

  getDetail = (id) => {

  }

  submitForm = (data) => {
    console.log('data', data)
  }

  radioChange = (selectCategory) => {
    this.setState({
      selectCategory
    })
  }

  render() {
    const { dataSource, loading, total, categories, selectCategory} = this.state;
    return (
      <div className="card-page">
        <Form style={{width: '60%'}} >
          <FormItem label="分类:">
            <Radio.Group dataSource={categories} value={selectCategory} onChange={this.radioChange} />
          </FormItem>
          <FormItem label="描述:" required >
            <Input.TextArea name="content" placeholder="输入描述"/>
          </FormItem>
          <FormItem label=" ">
            <Form.Submit onClick={this.handleSubmit}>提交</Form.Submit>
          </FormItem>
        </Form>
      </div>
    );
  }
}
