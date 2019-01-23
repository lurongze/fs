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
      pictureItems: [],
      detailData: {}
    };
  }

  componentDidMount() {
    this.getDetail(this.props.match.params.id);
    console.log('this.props.params', this.props.match.params.id)
  }

  getDetail = (id) => {
    this.setState({
      loading: true
    })
    request.get(`/gallery/detail-for-update/${id}`).then((res) => {
      if (res.code === 200) {
        const pictureItemsData = res.data.pictureItems || [];
        const pictureItems = pictureItemsData.map((item) => {
          return {
            id: item.id,
            uid: item.id,
            name: item.title || '',
            state: 'done',
            url: item.link,
            downloadURL: item.link,
            imgURL: item.link,
            response: {
              id: item.id,
              message: '',
              success: true,
              url: item.link
            }
          }
        });
        this.setState({
          detailData: res.data,
          selectCategory: res.data.category || '',
          pictureItems
        })
      }
    }).finally(() => {
      this.setState({
        loading: false
      })
    })
  }

  handleSubmit = (data, validate) => {
    console.log('handleSubmit', validate);
    const files = this.refs.uploader.getFiles() || [];
    const covers = files.filter((item, index) => {
      return index < 9;
    }).map((item) => {
      return item.url;
    })
    const ids = files.map((item) => {
      return item.id;
    })

    const formData = {
      ...data, ...{ covers: covers.join(',')}
    }

    console.log('formData', formData);
    this.setState({
      loading: true
    });
    request.post('/gallery', formData).then((res) => {
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

  titleChange = (value) => {
    const { detailData } = this.state;
    detailData.title = value
    this.setState({
      detailData
    })
  }


  render() {
    const { loading, categories, selectCategory, detailData, pictureItems } = this.state;
    return (
      <div className="card-bg">
        <Loading visible={loading} shape="fusion-reactor" style={{display: 'block'}}>
          <Form style={{width: '60%'}}>
            <FormItem label="图片">
              <Uploader ref={'uploader'} value={pictureItems} detailId={detailData.id} authorId={detailData.author}/>
            </FormItem>
            <FormItem label="分类:">
              <Radio.Group dataSource={categories} value={selectCategory} name="category" onChange={this.radioChange}  />
            </FormItem>
            <FormItem label="描述:" required requiredMessage={'描述为必填'}>
              <Input.TextArea name="title" placeholder="输入描述" value={detailData.title || ''} onChange={this.titleChange}/>
            </FormItem>
            <div style={{display: 'none'}}>
              <FormItem label="id:" required >
                <Input name="id" value={detailData.id || ''}/>
              </FormItem>
            </div>
            <FormItem label="">
              <Form.Submit validate onClick={this.handleSubmit}>提交</Form.Submit>
            </FormItem>
          </Form>
        </Loading>
      </div>
    );
  }
}
