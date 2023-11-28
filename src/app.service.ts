import { Injectable } from '@nestjs/common';
import { AppServiceTypes, Methods } from './types/app.service.types';

@Injectable()
export class AppService {
  getHello(): AppServiceTypes {
    return {
      message: 'Hi guys!',
      routes: {
        publicRoutes: [
          {
            name: 'getHello',
            method: Methods.GET,
            path: '/',
            description: 'Hello World!',
          },
          {
            name: 'signUp',
            method: Methods.POST,
            path: '/auth/signup',
            description: 'Sign up',
          },
          {
            name: 'login',
            method: Methods.GET,
            path: '/auth/login',
            description: 'Login',
          },
        ],

        privateRoutes: [
          {
            name: 'users',
            method: Methods.GET,
            path: '/auth/users',
            description: 'Get all users',
          },
          {
            name: 'userById',
            method: Methods.GET,
            path: '/auth/user/:id',
            description: 'Get user by id',
          },
          {
            name: 'updateUserByID',
            method: Methods.PUT,
            path: '/auth/user/:id',
            description: 'Get user by id',
          },
          {
            name: 'deleteUserById',
            method: Methods.DELETE,
            path: '/auth/user/:id',
            description: 'Get user by id',
          },
          {
            name: 'getBookById',
            method: Methods.GET,
            path: '/books/:id',
            description: 'Get a book by id',
          },
          {
            name: 'books',
            method: Methods.GET,
            path: '/books',
            description: 'Get all books',
          },
          {
            name: 'getBookById',
            method: Methods.GET,
            path: '/books/:id',
            description: 'Get a book by id',
          },
          {
            name: 'createBook',
            method: Methods.POST,
            path: '/books/create-book',
            description: 'Create a new book',
          },
          {
            name: 'updateBook',
            method: Methods.PUT,
            path: '/books/:id',
            description: 'Update a book by id',
          },
          {
            name: 'deleteBook',
            method: Methods.DELETE,
            path: '/books/:id',
            description: 'Delete a book by id',
          },
        ],
      },
    };
  }
}
