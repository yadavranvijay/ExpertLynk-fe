
import { Table, Col, Row, Card, Typography} from 'antd';
const { Title } = Typography;

export default function ReferralTransactionTable({referralTransactions}) {

  

  const referee = referralTransactions["referee"]
  const { items = [], pagination = {} } = referralTransactions["data"]
  const { total = 20, page = 1, page_size = 10 } = pagination
  let tableParams = { pagination: { current: page, pageSize: page_size, total: total } }

  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (data, record) => (
        <>
          <div>{data} {record.currency}</div>
        </>
      ),
    },

    {
      title: "Date and Time",
      dataIndex: "created_at",
      key: "created_at",
      render: (data, record) => (
        <div>{data}</div>
      ),
    },
   
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (data, record) => (
        <div>{data}</div>
      ),
    }
  ];

  return (
    <>
 
    {
    
      <Row >
        <Col span={24} style={{marginTop:"20px"}}  >
          <Card style={{margin:"10px", boxShadow: "10px 8px 24px 5px rgba(40, 49, 153, 0.8)" }}>
            <Title level={5} style={{ paddingLeft: '20px' }}> Transactions for {referee.referee_email} </Title>
            <Table
              columns={columns}
              dataSource={items}
              pagination={tableParams}
              rowKey={(record) => record.created_at}
              className="ant-border-space"
            />
              
          </Card>
        </Col>
      </Row>
   }
    </>
  )
}