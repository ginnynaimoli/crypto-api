import { Col, Row, Typography } from 'antd'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  
  // create 2 arrays for coinPrice and coinTimestamp to use as data for Chart
  const coinPrice = []
  const coinTimestamp = []  

  // loop through the data history and push each data to the array
  for (let i = 0; i < coinHistory?.data?.history?.length; i++ ){
    coinPrice.push(coinHistory?.data?.history[i].price)
  }
  
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.unshift((new Date(coinHistory?.data?.history[i].timestamp*1000)).toLocaleDateString());
  }

  // DATA to pass in Chart
  const data = {
    type: 'line',
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd'
      }
    ]
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }

  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>{coinHistory?.data?.change}%</Title>
          <Title level={5} className='current-change'>Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>

      <Line data={data} options={options} />
    </>
  )
}

export default LineChart