export const loanTableQuery = (
   searchTextLoan: string,
   queryByProductNameLoan: string[] | undefined,
   queryByStatusLoan: string[] | undefined,
   queryByDateLoan: string[] | undefined,
   checkerLoan?: boolean
) => {
   const queryParams: { [key: string]: any } = {};
   if (searchTextLoan) {
      queryParams.Search = searchTextLoan;
   }
   if (queryByProductNameLoan && queryByProductNameLoan.length > 0) {
      queryParams.LoanProduct = JSON.stringify(queryByProductNameLoan);
   }
   if (queryByStatusLoan && queryByStatusLoan.length > 0) {
      queryParams.status = JSON.stringify(
         queryByStatusLoan.map((status) => {
            const stat = checkerLoan && status == 'Pending' ? 'In-Review' : status;
            return stat.toUpperCase().replace(/-/g, '_');
         })
      );
   }
   if (queryByDateLoan && queryByDateLoan.length === 2) {
      queryParams.StartDate = queryByDateLoan[0];
      queryParams.EndDate = queryByDateLoan[1];
   }
   if (Object.keys(queryParams).length === 0) {
      queryParams.Initiator = !checkerLoan ? 'CREATEDBYME' : 'APPROVEDBYME';
   }
   return queryParams;
};
