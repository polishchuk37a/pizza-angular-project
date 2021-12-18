import {SushiDescription} from "./sushi-description";

export interface SushiData {
  id: number,
  name: string,
  price: number,
  image: string,
  description: SushiDescription
}
