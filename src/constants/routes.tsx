import { ProductFactoryLayout } from '@app/layouts/product-factory';

export const BasePath = '/product/factory';

export const RouteMaps = {
   productList: {
      element: (
         <ProductFactoryLayout
            header={<div style={{ height: '150px' }}></div>}
            content={<div style={{ height: '300px' }}></div>}
            fullContent={false}
         />
      ),
      path: (type = '/:productType') => `${BasePath}/list${type}`,
   },
};

export const Routes = Object.values(RouteMaps).map(({ element, path }) => ({
   element,
   path: typeof path === 'function' ? path() : path,
}));
