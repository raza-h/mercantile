import { createStyles } from "antd-style";

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

export default useTableStyles;