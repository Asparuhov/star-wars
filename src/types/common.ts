export interface ICardProps {
  id: string;
  type: string;
  name: string;
  age: string;
  imageUrl: string;
}

export interface IDetailedCardProps {
  name: string;
  imageUrl: string;
  [key: string]: any;
}

export interface IDetailedViewProps {}

export interface IEntity {
  [key: string]: string;
}

export enum currencies {
  GALACTICCREDITS = "GalacticCredits",
  WUPIUPI = "Wupiupi",
  PEGGATS = "Peggats",
}

export interface IChartProps {
  currency: string;
  exchangeRates: Record<string, number>;
}