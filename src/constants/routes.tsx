import EligibilityCriteria from '@app/components/create-product/credit-personal-loan/eligibility-criteria/eligibility-criteria';

export const BasePath = '/product/factory';

export const RouteMaps = {
   productList: {
      element: <EligibilityCriteria />,
      path: (type = '/:productType') => `${BasePath}/list${type}`,
   },
};

export const Routes = Object.values(RouteMaps).map(({ element, path }) => ({
   element,
   path: typeof path === 'function' ? path() : path,
}));
