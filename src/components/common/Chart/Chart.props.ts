export interface ItemProps {
  label: string;
  value: number;
  color: string;
  isShowValue?: boolean;
}

export interface ItemFormatProps extends ItemProps {
  mt: string;
}

export default interface ChartProps {
  data: ItemProps[];
  defaultData?: ItemProps[];
  height?: number | null;
  unit?: string;
  itemClick?: Function
}
