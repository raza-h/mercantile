import { Flex, Modal, Tag } from "antd";
import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import { fetchTotalCount, getRegistrations } from "../../apis/registrations";
import strings from "../../constants/strings";
import { columns, statusObjects } from "./registration-listing-constants";
import { useLocation, useNavigate } from "react-router-dom";
import { showErrorToast } from "../../utils/common";
import dayjs from "dayjs";
import { EditOutlined } from "@ant-design/icons";
import StatusForm from "./status-form";
import { Popover, Table } from "../../common";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

const RegistrationListing = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [countLoading, setCountLoading] = useState(false);
  const [statusChangeLoading, setStatusChangeLoading] = useState(false);
  const [statusModalRegistration, setStatusModalRegistration] = useState<{
    [key: string]: any;
  } | null>(null);
  const formRef = useRef<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const current = Number(new URLSearchParams(location.search).get("page")) || 1;

  const handlePageChange = (page: number) => {
    navigate({ search: `?page=${page}` });
  };

  useEffect(() => {
    const fetchCount = async () => {
      setCountLoading(true);
      try {
        const count = await fetchTotalCount();
        setTotal(count ?? 0);
      } catch (error: any) {
        showErrorToast({
          action: "fetching some details about the registrations",
          error,
        });
      } finally {
        setCountLoading(false);
      }
    };

    fetchCount();
  }, []);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const data = await getRegistrations(current);
        setRegistrations(data);
      } catch (error: any) {
        showErrorToast({ action: "fetching registrations", error });
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [location.search]);

  const dataSource = registrations?.map(
    ({
      created_at,
      name,
      email,
      city,
      storage,
      color,
      interests,
      model,
      phone,
      id,
      status,
      updated_at,
    }) => ({
      key: id,
      [strings.user]: (
        <article>
          <p className={styles.bold}>{name}</p>
          <Flex gap={2} vertical>
            <Flex gap={5} align="center">
              <small className={styles.bold}>Email</small>
              <small>{email}</small>
            </Flex>
            <Flex gap={5} align="center">
              <small className={styles.bold}>Phone</small>
              <small>{`0${phone}`}</small>
            </Flex>
          </Flex>
          <small className={styles.bold} style={{ fontSize: "0.8em" }}>
            {dayjs(created_at).format("Do MMMM, YYYY") || created_at}
          </small>
        </article>
      ),
      [strings.status]: (
        <Flex gap={2}>
          <Tag
            color={statusObjects[status]?.bg}
            style={{
              color: statusObjects[status].color,
              padding: "0.5rem 1.5rem",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {statusObjects[status]?.label}
          </Tag>
          <Popover
            title={
              <Flex style={{ padding: "1rem 1.5rem" }}>
                {updated_at ? (
                  <p>
                    Updated on
                    <br />
                    <strong style={{ fontWeight: 600 }}>
                      {dayjs(updated_at).format("Do MMMM, YYYY")}
                    </strong>
                  </p>
                ) : (
                  <p>No Action has been taken</p>
                )}
              </Flex>
            }
          />
        </Flex>
      ),
      [strings.city]: <p>{city}</p>,
      [strings.variant]: (
        <article>
          <p>
            {model} - {storage}
          </p>
          <small className={styles.bold}>{color}</small>
        </article>
      ),
      [strings.interests]: <p>{interests || "None"}</p>,
      [strings.actions]: (
        <Flex
          gap={8}
          align="center"
          style={{ cursor: "pointer" }}
          onClick={() =>
            setStatusModalRegistration({
              created_at,
              updated_at,
              name,
              email,
              city,
              storage,
              color,
              interests,
              model,
              phone,
              id,
              status,
            })
          }
        >
          <EditOutlined style={{ marginBottom: 10, color: "#0046b5" }} />
          <p
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#0046b5",
            }}
          >
            Update Status
          </p>
        </Flex>
      ),
    })
  );

  return (
    <main className={styles.main}>
      <Modal
        title={`Change Status for ${statusModalRegistration?.name}`}
        open={!!statusModalRegistration}
        onClose={() => {
          setStatusModalRegistration(null);
          setStatusChangeLoading(false);
        }}
        onCancel={() => {
          setStatusModalRegistration(null);
          setStatusChangeLoading(false);
        }}
        onOk={async () => {
          formRef.current.submit();
        }}
        okButtonProps={{ loading: statusChangeLoading }}
        destroyOnClose
      >
        <StatusForm
          registration={statusModalRegistration}
          registrations={registrations}
          updateRegistrations={setRegistrations}
          setLoading={setStatusChangeLoading}
          closeModal={() => {
            setStatusModalRegistration(null);
            setStatusChangeLoading(false);
          }}
          ref={formRef}
        />
      </Modal>
      <h2>Registration Listing</h2>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading || countLoading}
        scroll={{
          x: 1400,
          y: registrations?.length > 3 && window.innerHeight < 800 ? 400 : 800,
        }}
        rows={total}
        currentPage={current}
        handlePageChange={handlePageChange}
      />
    </main>
  );
};

export default RegistrationListing;
