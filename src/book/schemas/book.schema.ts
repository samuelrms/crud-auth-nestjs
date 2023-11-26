import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  ADVENTURE = 'adventure',
  HORROR = 'horror',
  SCIENCE = 'science',
  HISTORY = 'history',
  FANTASY = 'fantasy',
  ROMANCE = 'romance',
  BIOGRAPHY = 'biography',
  COMICS = 'comics',
  CRIME = 'crime',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop()
  category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);
