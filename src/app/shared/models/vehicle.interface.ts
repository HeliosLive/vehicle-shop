export interface Vehicle {
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
export interface VehicleFormData extends Omit<Vehicle, 'colors'> {
  color: string;
}
