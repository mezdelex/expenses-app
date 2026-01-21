export interface ApiConfig {
  baseUrl: string;

  applicationUsersLogoutEndpoint: string;
  categoriesListEndpoint: string;
  categoriesPaginatedEndpoint: string;
  expensesDeleteEndpoint: string;
  expensesPaginatedEndpoint: string;
  expensesPatchEndpoint: string;
  expensesPostEndpoint: string;
  identityInfoEndpoint: string;
  identityLoginEndpoint: string;
}
