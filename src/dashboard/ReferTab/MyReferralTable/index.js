import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RightSquareTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Table, Col, Row, Card, Button, Typography } from "antd";
import { listReferrals } from "../../../redux/slice/rewardSlice";
import ReferralTransactionTable from "../ReferralTransactionTable";
import rewardService from "../../../services/rewardService";
import "./index.css";

const { Title } = Typography;

export default function ListReferralsTable() {
  const dispatch = useDispatch();
  const [referralTransactions, setReferralTransactions] = useState(null);
  const [flag, setFlag] = useState(false);
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

  const handleClose = () => {
    setFlag(false);
  };

  const onRowSelect = (record) => {
    rewardService
      .listRefferalTransaction({
        filters: {},
        page: 1,
        order_by: ["-created_at"],
        referee_id: record.referee_id,
      })
      .then((response) => {
        setReferralTransactions({ referee: record, data: response.data });
        setFlag(true);
      });
  };

  const columns = [
    {
      title: <Title level={5}>Name</Title>,
      dataIndex: "referee_email",
      key: "referee_email",
      render: (data, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ fontSize: "12px" }}>{data}: </p>
          <p
            style={{
              fontWeight: "bold",
              marginLeft: "1px",
              fontSize: "12px",
            }}
          >
            {record.referee_earn_benefit.WSP
            } WSP
          </p>
        </div>
      ),
    },
    {
      title: <Title level={5}>Details</Title>,
      dataIndex: "referee_earn_benefit",
      key: "referee_earn_benefit2",
      render: (data, record) => (
        <Button
          type="text"
          icon={
            flag ? (
              <CloseCircleTwoTone twoToneColor="#ff0000" />
            ) : (
              <RightSquareTwoTone />
            )
          }
          size="large"
          onClick={flag ? handleClose : () => onRowSelect(record)}
        />
      ),
    },
  ];

  return (
    <>
      <div className="site-card-wrapperr2" style={{ marginTop: "2%" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card
              bordered={false}
              title={<Title level={4}>My Referral Earnings</Title>}
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

                {flag && referralTransactions && (
                  <ReferralTransactionTable
                    referralTransactions={referralTransactions}
                  />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
