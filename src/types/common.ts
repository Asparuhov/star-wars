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
  [key: string]: string | number;
}

export interface IDetailedViewProps {}

export interface IEntity {
  [key: string]: string | number;
}
