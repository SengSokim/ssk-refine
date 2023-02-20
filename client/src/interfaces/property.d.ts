import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    propertyType: string,
    quantity: number | undefined,
    price: number | undefined,
}

export interface PropertyCardProps {
  id?: BaseKey | undefined,
  title: string,
  quantity: string,
  price: string,
  photo: string,
  description: string,
}
