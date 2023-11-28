import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ParsedUrlQuery } from 'node:querystring';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(
    query: ParsedUrlQuery,
  ): Promise<{ books: Book[]; total: number }> {
    const resPerPage = Number(query.perPage) || 20;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword as string,
            $options: 'i',
          },
        }
      : {};
    const count = await this.bookModel.countDocuments({ ...keyword });
    const books = await this.bookModel
      .find({ ...keyword })
      .skip(skip)
      .limit(resPerPage);
    return {
      total: count,
      books,
    };
  }

  async create(book: Book): Promise<Book> {
    const createBook = await this.bookModel.create(book);
    return createBook;
  }

  async findById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please provide a valid id');
    }

    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please provide a valid id');
    }

    const updateBook = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });

    if (!updateBook) {
      throw new NotFoundException('Book not found');
    }

    return updateBook;
  }

  async deleteById(id: string): Promise<Book> {
    const deleteBook = await this.bookModel.findByIdAndDelete(id);

    if (!deleteBook) {
      throw new NotFoundException('Book not found');
    }

    return deleteBook;
  }
}
