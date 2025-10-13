import { ISizeCalculationResult } from "image-size/types/interface";

export function getDimensions(array: {
      id: number;
      dimensions: ISizeCalculationResult;
  }[], artworkId: number) {
    const index = array.findIndex((obj) => {
      return obj.id === artworkId
    });
    return array[index].dimensions
}