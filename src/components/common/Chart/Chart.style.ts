import styled from "styled-components";

const Container = styled.div<{height?: string| number}>`
  position: relative;
  width: 100%;
  height: ${(props) => typeof props.height === 'string' ? props.height : `${props.height}px`};
  display: flex;
  margin-bottom: 60px;

  &::after {
    position: absolute;
    bottom: -8px;
    content: "";
    display: block;
    width: 100%;
    height: 8px;
    background: #BDBDBD;
    margin: 0;
    border-radius: 4px;
  }
`;

export const Item = styled.div<{color: string, mt: string}>`
  position: relative;
  flex: 1 0 auto;
  margin-left: 3px;
  margin-right: 3px;
  border-radius: 20px 20px 0 0;
  background: ${(props) => props.color};
  margin-top: ${(props) => props.mt};
  transition: all .5s;

  .chart-item-label, .chart-item-value {
    display: inline-block;
    position: absolute;
    width: 100%;
    font-weight: bold;
    text-align: center;
  }

  .chart-item-label {
    bottom: -40px;
    font-size: 20px;
  }

  .chart-item-value {
    top: -30px;
  }
`

export default Container;
