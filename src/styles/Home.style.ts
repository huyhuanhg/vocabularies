import { Button, ButtonEffect } from "@/components/common";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  padding: 50px 20px 40px;

  .ButtonEffect:disabled {
    .ant-statistic {
      &-content {
        font-size: 1.25rem !important;
        color: #828282;
        font-family: inherit;
        line-height: 1;
      }
    }
  }
`;

export const Message = styled.div`
  text-align: center;
`;

export default Container;
