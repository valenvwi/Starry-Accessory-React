class ProductModel {
  id: number;
  name: string;
  description?: string;
  unitPrice: number;
  stock: number;
  availableStock: number;
  imageUrl: string;
  dateCreated: Date;
  category: string;

  constructor(
    id: number,
    name: string,
    description: string,
    unitPrice: number,
    stock: number,
    availableStock: number,
    imageUrl: string,
    dateCreated: Date,
    category: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.unitPrice = unitPrice;
    this.stock = stock;
    this.availableStock = availableStock;
    this.imageUrl = imageUrl;
    this.dateCreated = dateCreated;
    this.category = category;
  }
}

export default ProductModel;
