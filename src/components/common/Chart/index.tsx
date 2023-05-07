import Container, * as Style from "./Chart.style";
import ChartProps, { ItemFormatProps, ItemProps } from "./Chart.props";
import { FC, useEffect, useState } from "react";

const Chart: FC<ChartProps> = ({ height, data, defaultData, unit }) => {
  const formatData = (data?: ItemProps[]) => {

    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    const maxValue = [...data].sort((current, next) => next.value - current.value)[0]
      .value;

    return data.map((convert) => {
      return ({
        ...convert,
        mt: convert.value === 0 ? "300px" :`${(maxValue - convert.value) / maxValue * 300}px`,
      })
    });
  };

  const [resources, setResources] = useState<ItemFormatProps[]>(
    formatData(defaultData)
  );

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setResources(formatData(data));
    }
  }, [data]);

  return (
    <Container height={height ?? 305}>
      {resources.map((resource, index) => (
        <Style.Item key={index} color={resource.color} mt={resource.mt}>
          <span className="chart-item-label">{resource.label}</span>
          {resource.isShowValue && (
            <span className="chart-item-value">
              {resource.value} {unit}
            </span>
          )}
        </Style.Item>
      ))}
      {/* <div
        className="col text-center"
        style={{
          height: "300px",
          paddingLeft: "5px!important",
          paddingRight: "5px!important",
        }}
      >
        <div
          data-count="100"
          style={{ marginTop: "285px", height: "15px" }}
          className="dashboard-1 dashboard dashboard-item-1"
        >
          <div className="text-center text-count-word">
            <span className="count-word" style={{ display: "inline" }}>
              0 từ
            </span>
          </div>
          <div className="text-center dashboard-stt">
            <span>1</span>
          </div>
        </div>
      </div> */}
    </Container>
  );
};

export default Chart;
