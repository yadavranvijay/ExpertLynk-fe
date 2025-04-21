import { Table, Card, Typography } from "antd";
import { pointTransactions } from "../../redux/slice/rewardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const { Title } = Typography;

function TransactionHistory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      pointTransactions({
        filters: { type: "EARN" },
        page: 1,
        order_by: ["-created_at"],
      })
    );
  }, [dispatch]);

  const { transactionData = {}, fetching } = useSelector(({ reward }) => reward);

  const { items = [], pagination = {} } = transactionData;
  const { total = 20, page = 1, page_size = 10 } = pagination;
  let tableParams = {
    pagination: { current: page, pageSize: page_size, total: total },
  };

  const handleTablePageChange = (pagination) => {
    tableParams.pagination.current = pagination.current;
    dispatch(
      pointTransactions({
        filters: {},
        page: pagination.current,
        order_by: ["-created_at"],
      })
    );
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "description",
      key: "description",
      render: (data, record) => (
        <>
          <Typography.Text level={5}>{record.description}</Typography.Text>
        </>
      ),
    },
    {
      title: "Points",
      dataIndex: "amount",
      key: "amount",
      render: (data, record) => (
        <>
          <Typography.Text level={5}>{record.amount} WSP</Typography.Text>
        </>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "created_at",
      key: "created_at",
      render: (data, record) => (
        <>
          <Typography.Text level={5}>{record.created_at}</Typography.Text>
        </>
      ),
    },
  ];

  return (
    <>
      <Card
        title={<Title level={4}>Last 10 Earnings</Title>}
        bordered={false}
        className="criclebox tablespace mb-24"
      >
        <div className="table-responsive-md">
          <Table
            columns={columns}
            dataSource={items}
            pagination={tableParams.pagination}
            loading={fetching}
            rowKey={(record, index) =>  index} 
            onChange={handleTablePageChange}
            className="ant-border-space"
          />
        </div>
      </Card>
    </>
  );
}

export default TransactionHistory;
