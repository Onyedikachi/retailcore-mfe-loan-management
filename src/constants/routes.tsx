import { TestStepper } from '@app/components/stepper/TestStepper';
export const BasePath = '/product/factory';

export const RouteMaps = {
   productList: {
      element: <TestStepper />,
      path: (type = '/:productType') => `${BasePath}/list${type}`,
   },
};

export const Routes = Object.values(RouteMaps).map(({ element, path }) => ({
   element,
   path: typeof path === 'function' ? path() : path,
}));
