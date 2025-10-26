export interface IPlant {
  _id?: string;       // ID from MongoDB
  name: string;
  species?: string;
  birthDate?: Date;
  imageUrl?: string;
  user?: string;      // User ID reference
  createdAt?: Date;   // Created by timestamps: true
  updatedAt?: Date;   // Created by timestamps: true
}