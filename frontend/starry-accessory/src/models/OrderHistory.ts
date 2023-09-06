export class OrderHistory {
  constructor(
    public id: string,
    public orderTrackingNumber: string,
    public totalPrice: number,
    public totalQuantity: number,
    public status: any,
    public dateCreated: string,
    public orderItems: {
      name: string | null;
      imageUrl: string | null;
      unitPrice: number;
      quantity: number;
      productId: string;
    }[]
  ) {}
}
