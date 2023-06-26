import React, { useState } from 'react';
import { Button, Space, Form, Input, Rate, message } from 'antd';
import './App.less'

const { TextArea } = Input;


interface Data {
  img: string
  title: string
  description: string
  price: number
  comments: string
  rate: number
}

const data: Data[] = [
  {
    img: require('./img/1.jpeg'),
    title: '百 (冷饮) 1扎',
    description: '院落创意菜',
    price: 19.9,
    comments: '',
    rate: 0,
  },
  {
    img: require('./img/1.jpeg'),
    title: '肥牛石锅拌饭+鸡蛋葵1份',
    description: '正一',
    price: 29,
    comments: '',
    rate: 0,
  },
  {
    img: require('./img/1.jpeg'),
    title: '冻奶 (小) 1杯',
    description: 'Salud冻酸奶',
    price: 20,
    comments: '',
    rate: 0,
  },
  {
    img: require('./img/1.jpeg'),
    title: '吉汁烧鱼+中杯汽水/紫菜蛋',
    description: '吉野家',
    price: 14,
    comments: '',
    rate: 0,
  },
];

const App: React.FC = () => {

  const [showBackComment, setShowBackComment] = useState<number>()
  
  const [comment, setComment] = useState<string>('')
  
  const [rate, setRate] = useState<number>(0)



  
  const onClick = (i: number) => {
    if (!comment) {
      message.error('请输入评论')
    } else if (rate === 0) {
      message.error('请输入评分')
    } else {
      data[i].comments = comment
      data[i].rate = rate
      setComment('')
      setRate(0)
      onCancel()
    }
  };

  
  const onCancel = () => {
    setShowBackComment(-1)
  }

  const onTextAreaChange = (e: any) => {
    setComment(e.target.value)
  }


  const onRateChange = (value: number) => {
    setRate(value);
  }

  return (
    <div className='App'>
      <div className="header">我的订单</div>
      <ul>
        {
          data.map((item, index) => (
            <li key={index} className='data-item'>
              <div className="content">
                <div className="left">
                  <img src={item.img} alt="" width={100} />
                  <div className='info'>
                    <p className='title'>{item.title}</p>
                    <p>{item.description}</p>
                    <p>￥{item.price}</p>
                  </div>
                </div>

                <Button
                  className={item.comments.length !== 0 ? 'grey' : 'red'}
                  type="primary"

                  onClick={() => setShowBackComment(index)}
                >
                  {item.comments.length !== 0 ? '已评价' : '评价'}
                </Button>
              </div>
              {
                showBackComment === index && <div className='comment'>
                  {
                    item.comments.length !== 0 ?
                      <TextArea
                        value={item.comments}
                        disabled={item.comments.length !== 0}
                        rows={4}
                      /> :
                      <TextArea
                        placeholder="输入评论..."
                        rows={4}
                        onChange={onTextAreaChange}
                      />
                  }
                  <Rate
                    allowHalf
                    defaultValue={item.rate}
                    disabled={item.rate !== 0}
                    onChange={onRateChange}
                  />
                  {
                    item.comments.length === 0 && <div>
                      <Space>
                        <Button onClick={onClick.bind(this, index)} type='primary' danger>
                          提交
                        </Button>
                        <Button htmlType="button" onClick={onCancel}>
                          取消
                        </Button>
                      </Space>
                    </div>
                  }
                </div>
              }
            </li>
          ))
        }
      </ul >
    </div >
  )
}

export default App;