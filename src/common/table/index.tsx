import { Table as AntTable, TableProps } from "antd";
import { PAGE_SIZE } from "../../constants/generic";
import useTableStyles from "./hooks/useTableStyles";
import cx from "clsx";
import { column } from "./constants/types";
import { FC, ReactNode } from "react";

const Table: FC<{
  columns?: column[];
  dataSource?: {[key: string]: ReactNode}[];
  loading?: boolean;
  className?: string;
  rows?: number;
  currentPage?: number;
  handlePageChange?: (page: number) => void;
} & TableProps> = ({
  columns = [],
  dataSource = [],
  loading = false,
  className = "",
  rows = 0,
  currentPage = 1,
  handlePageChange = () => {},
  ...props
}) => {
  const { styles } = useTableStyles();
  return (
    <AntTable
      columns={columns}
      className={cx(styles.customTable, className)}
      dataSource={dataSource}
      loading={loading}
      pagination={
        rows > PAGE_SIZE
          ? {
              total: rows,
              current: currentPage,
              pageSize: PAGE_SIZE,
              onChange: handlePageChange,
              showSizeChanger: false,
            }
          : false
      }
      {...props}
    />
  );
};

export default Table;
