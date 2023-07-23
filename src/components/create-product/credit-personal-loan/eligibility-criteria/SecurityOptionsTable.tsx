import { SecurityOptions } from '@app/@types/create-credit-product';
import { BoxShadowIconButton, Tooltip } from '@app/components/atoms';
import { Icon } from '@app/components/atoms/Icon';
import { Table } from '@app/components/atoms/Table';
import { FormControlBase } from '@app/components/forms/FormControl';
import { Box, Typography } from '@mui/material';
import { FieldArrayRenderProps } from 'formik';
export type SecurityOptionsTableProps<T extends SecurityOptions> = {
   type: T;
   securities: Array<
      T extends 'collateral' ? { name: string; mmi: number; id: string } : { name: string; id: string }
   >;
   onCancelClick: (type: T, name: string) => void;
   fieldName?: string;
   arrayHelper: FieldArrayRenderProps;
};

export const SecurityOptionsTable = <T extends SecurityOptions>({
   type,
   securities,
   onCancelClick,
   fieldName,
   arrayHelper,
}: SecurityOptionsTableProps<T>) => {
   if (!securities.length) return null;

   const handleRemoveItem = (securityName: string, index: number) => {
      onCancelClick(type, securityName);
      arrayHelper.remove(index);
   };

   return (
      <Table
         headerProps={{ data: tableHeaderMeta(type) }}
         bodyProps={{
            rows: securities.map((security, index) => ({
               [type]: security.name,
               cancel: (
                  <BoxShadowIconButton onClick={() => handleRemoveItem(security.name, index)}>
                     <Icon type="close" color="primary" />
                  </BoxShadowIconButton>
               ),
               ...(type === 'collateral' && {
                  mmi: (
                     <FormControlBase
                        value={(security as any).mmi}
                        name={`${fieldName}.${index}`}
                        control="input"
                        allow="ratio"
                     />
                  ),
               }),
            })),
         }}
      />
   );
};

const tooltipText =
   // eslint-disable-next-line max-len
   'Specify the lowest appraised value that the lender is willing to accept for the collateral securing the loan.';

const collateralAssetsOptions = [
   { key: 'collateral', element: 'COLLATERAL ASSET' },
   {
      key: 'mmi',
      element: (
         <Box display="flex" alignItems="center">
            <Typography>Minimum Market Value (%)</Typography> <Tooltip text={tooltipText} />
         </Box>
      ),
   },
];

const guarantorOptions = [{ key: 'guarantor', element: 'DOCUMENT NAME' }];

const otherSecurityOptions = [{ key: 'other', element: 'OTHER SECURITY REQUIREMNTS' }];

const tableHeaderMeta = (option: SecurityOptions) => [
   { key: 'sn', element: 'S/N' },
   ...(option === 'collateral'
      ? collateralAssetsOptions
      : option === 'guarantor'
      ? guarantorOptions
      : otherSecurityOptions),
   { key: 'cancel' },
];
