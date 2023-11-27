import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {
    message: string;
    routes: {
      name: string;
      method: string;
      path: string;
      description: string;
    }[];
  } {
    return {
      message: 'Hi guys!',
      routes: [
        {
          name: 'getHello',
          method: 'GET',
          path: '/',
          description: 'Hello World!',
        },
        {
          name: 'books',
          method: 'GET',
          path: '/books',
          description: 'Get all books',
        },
        {
          name: 'getBookById',
          method: 'GET',
          path: '/books/:id',
          description: 'Get a book by id',
        },
        {
          name: 'createBook',
          method: 'POST',
          path: '/books/create-book',
          description: 'Create a new book',
        },
        {
          name: 'updateBook',
          method: 'PUT',
          path: '/books/:id',
          description: 'Update a book by id',
        },
        {
          name: 'deleteBook',
          method: 'DELETE',
          path: '/books/:id',
          description: 'Delete a book by id',
        },
      ],
    };
  }
}
