import styled from "styled-components";

const Container = styled.div<{ height?: string | number }>`
  position: relative;
  width: 100%;
  height: ${(props) =>
    typeof props.height === "string" ? props.height : `${props.height}px`};
  display: flex;
  margin-bottom: 60px;

  &::after {
    position: absolute;
    bottom: -8px;
    content: "";
    display: block;
    width: 100%;
    height: 8px;
    background: #bdbdbd;
    margin: 0;
    border-radius: 4px;
  }
`;

export const Item = styled.div<{
  color: string;
  mt: string;
  height: string | number;
}>`
  position: relative;
  flex: 1 0 auto;
  margin-left: 3px;
  margin-right: 3px;
  border-radius: 20px 20px 0 0;
  background: ${(props) => props.color};
  margin-top: ${(props) => props.mt};
  transition: all 0.3s;
  cursor: pointer;

  .chart-item-label,
  .chart-item-value {
    display: inline-block;
    position: absolute;
    width: 100%;
    font-weight: bold;
    text-align: center;
  }

  .chart-item-label {
    bottom: -40px;
    font-size: 20px;
  transition: all 0.3s;
  }

  .chart-item-value {
    top: -30px;
  transition: all 0.3s;
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: ${(props) =>
      typeof props.height === "string"
        ? `calc(${props.height} + 40px)`
        : `${props.height + 40}px`};
    bottom: -40px;
  }

  &:hover {
    transform: scaleX(1.05);
    .chart-item-value,
    .chart-item-label {
      transform: scale(1.4);
    }
  }
`;

export default Container;
