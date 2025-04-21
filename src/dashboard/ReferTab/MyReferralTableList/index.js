import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Table, Col, Row, Card, Typography } from "antd";
import { listReferrals } from "../../../redux/slice/rewardSlice";
import "./index.css";

const { Title } = Typography;

export default function ListReferralsTableList() {
  const dispatch = useDispatch();
  const [tableParams, setTableParams] = useState({
    pagination: { current: 1, pageSize: 5, total: 0 },
  });

  useEffect(() => {
    dispatch(listReferrals({ filters: {}, page: tableParams.pagination.current, order_by: ["-created_at"] }));
  }, [dispatch, tableParams.pagination.current]);

  const { listReferralsData = {}, fetchingRefferalData } = useSelector(
    ({ reward }) => reward
  );

  const { items = [], pagination = {} } = listReferralsData;
  const { total = 20, page = 1, page_size = 5 } = pagination;
  useEffect(() => {
    setTableParams((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, total: total, pageSize: page_size, current: page },
    }));
  }, [total, page, page_size]);

  const handleTablePageChange = (pagination) => {
    setTableParams({
      pagination: { ...pagination },
    });
  };

  const columns = [
    {
      title: <Title level={5}>Name</Title>,
      dataIndex: "referee_email",
      key: "referee_email",
      render: (data, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ fontSize: "12px" }}>{data}</p>
        </div>
      ),
    },
  ];

  return (
    <>
      {items.length === 0 ? (
        <div className="card mt-4 p-4">
          <div className="users-wi">
            <img src="./images/users.gif" alt="Users" />
          </div>
          <h3 className="h4 text-center">
            No one has joined using your referral code yet. <br /> Why not
            invite friends now to start earning more.
          </h3>
        </div>
      ) : (
        <div className="site-card-wrapperr2" style={{ marginTop: "2%" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Card
                bordered={false}
                title={<Title level={4}>My Referral</Title>}
                className="criclebox tablespace mb-24"
              >
                <div className="table-responsive2">
                  <div className="table-container2">
                    <Table
                      columns={columns}
                      dataSource={items}
                      pagination={tableParams.pagination}
                      loading={fetchingRefferalData}
                      rowKey={(record) => record.referee_email}
                      onChange={handleTablePageChange}
                      className="ant-border-space"
                    />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
            
        </div>
      )}
    </>
  );
}
