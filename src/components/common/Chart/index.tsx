import Container, * as Style from "./Chart.style";
import ChartProps, { ItemFormatProps, ItemProps } from "./Chart.props";
import { FC, useEffect, useState } from "react";

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
            ? "300px"
            : `${((maxValue - convert.value) / maxValue) * 300}px`,
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
    <Container height={height ?? 305}>
      {resources.map((resource, index) => (
        <Style.Item
          key={`star_${index + 1}`}
          color={resource.color}
          mt={resource.mt}
          onClick={() =>
            itemClick && resource.value > 0 && itemClick(index + 1)
          }
          height={height ?? 305}
        >
          <span className="chart-item-label">{resource.label}</span>
          {resource.isShowValue && (
            <span className="chart-item-value">
              {resource.value} {unit}
            </span>
          )}
        </Style.Item>
      ))}
    </Container>
  );
};

export default Chart;
