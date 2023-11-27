export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type Routes = {
  name: string;
  method: Methods;
  path: string;
  description: string;
};

export type AppServiceTypes = {
  message: string;
  routes: {
    publicRoutes: Routes[];
    privateRoutes: Routes[];
  };
};
