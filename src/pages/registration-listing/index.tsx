import { Flex, Pagination, Table } from "antd";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { fetchTotalCount, getRegistrations } from "../../apis/registrations";
import strings from "../../constants/strings";
import { columns } from "./registration-listing-constants";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "../../constants/generic";
import { showErrorToast } from "../../utils.js/common";

const RegistrationListing = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [countLoading, setCountLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage =
    Number(new URLSearchParams(location.search).get("page")) || 1;

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
        const data = await getRegistrations(currentPage);
        setRegistrations(data);
      } catch (error: any) {
        showErrorToast({ action: "fetching registrations", error });
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [location.search]);

  const getDataSource = () => {
    return registrations?.map(
      ({ name, email, city, storage, color, interests, model, phone, id }) => ({
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
          </article>
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
      })
    );
  };

  return (
    <main className={styles.main}>
      <h1>Registration Listing</h1>
      <Table
        columns={columns}
        dataSource={getDataSource()}
        loading={loading || countLoading}
        scroll={{ x: 800 }}
        pagination={false}
      />
      <Flex
        justify="end"
        style={{
          marginTop: "2rem",
          ...(countLoading ? { display: "none" } : {}),
        }}
      >
        {total > PAGE_SIZE && (
          <Pagination
            total={total}
            current={currentPage}
            pageSize={PAGE_SIZE}
            onChange={(page) => {
              navigate({ search: `?page=${page}` });
            }}
          />
        )}
      </Flex>
    </main>
  );
};

export default RegistrationListing;
