import Container, * as Style from "./Chart.style";
import ChartProps, { ItemFormatProps, ItemProps } from "./Chart.props";
import { FC, useEffect, useState } from "react";
import { CountUp } from 'use-count-up';

const Chart: FC<ChartProps> = ({
  height,
  data,
  defaultData,
  unit,
  itemClick,
}) => {
  const formatData = (data?: ItemProps[]) => {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    const maxValue = [...data].sort(
      (current, next) => next.value - current.value
    )[0].value;

    return data.map((convert) => {
      return {
        ...convert,
        mt:
          convert.value === 0
            ? height
              ? `${height}px`
              : "45vh"
            : height
            ? `${((maxValue - convert.value) / maxValue) * height}px`
            : `calc(45vh * ${maxValue - convert.value}/${maxValue})`,
      };
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
    <Container height={height ? height + 5 : 305}>
      {resources.map((resource, index) => (
        <Style.Item
          key={`star_${index + 1}`}
          color={resource.color}
          mt={resource.mt}
          onClick={() =>
            itemClick && resource.value > 0 && itemClick(index + 1)
          }
          height={height ? height + 5 : 305}
        >
          <span className="chart-item-label">{resource.label}</span>
          {resource.isShowValue && (
            <span className="chart-item-value">
              <CountUp isCounting end={resource.value} /> {unit}
            </span>
          )}
        </Style.Item>
      ))}
    </Container>
  );
};

export default Chart;
