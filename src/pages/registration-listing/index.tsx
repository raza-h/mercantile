import { Flex, Table } from "antd";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { fetchTotalCount, getRegistrations } from "../../apis/registrations";
import strings from "../../constants/strings";
import { columns } from "./registration-listing-constants";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "../../constants/generic";
import { showErrorToast } from "../../utils.js/common";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { createStyles } from "antd-style";
dayjs.extend(advancedFormat);

const useTableStyles = createStyles(({ css, prefixCls }) => {
  return {
    customTable: css`
      .${prefixCls}-table {
        .${prefixCls}-table-container {
          .${prefixCls}-table-body, .${prefixCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: unset;
            overflow-y: auto;
            @media only screen and (min-width: 1024px) {
              max-height: 400px;
            }
          }
        }
      }
    `,
  };
});

const RegistrationListing = () => {
  const { styles: tableStyles } = useTableStyles();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [countLoading, setCountLoading] = useState(false);
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

  const getDataSource = () => {
    return registrations?.map(
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
      <h2>Registration Listing</h2>
      <Table
        columns={columns}
        className={tableStyles.customTable}
        dataSource={getDataSource()}
        loading={loading || countLoading}
        scroll={{
          x: 800,
          y:
            registrations?.length > 3
              ? window.innerHeight < 800
                ? 400
                : 800
              : undefined,
        }}
        pagination={
          total > PAGE_SIZE
            ? {
                total,
                current,
                pageSize: PAGE_SIZE,
                onChange: handlePageChange,
              }
            : false
        }
      />
    </main>
  );
};

export default RegistrationListing;
