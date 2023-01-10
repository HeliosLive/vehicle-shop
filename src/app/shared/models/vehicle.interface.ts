export interface Vehicles {
  id?: number;
  type: string;
  brand: string;
  colors: string[];
  img?: string;
}

/**
 * We could also create a shared interface and duplicate from that.
 * However, it's good to see how to use typescript utility types like `Omit`
 */
export interface Vehicle extends Omit<Vehicles, 'colors'> {
  color: string;
}
