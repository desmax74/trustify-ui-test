// This file is auto-generated by @hey-api/openapi-ts

import {
  createClient,
  createConfig,
  type Options,
} from "@hey-api/client-axios";
import type {
  InfoError,
  InfoResponse,
  ListAdvisoriesData,
  ListAdvisoriesError,
  ListAdvisoriesResponse,
  UploadAdvisoryData,
  UploadAdvisoryError,
  UploadAdvisoryResponse,
  UpdateAdvisoryLabelsData,
  UpdateAdvisoryLabelsError,
  UpdateAdvisoryLabelsResponse,
  PatchAdvisoryLabelsData,
  PatchAdvisoryLabelsError,
  PatchAdvisoryLabelsResponse,
  GetAdvisoryData,
  GetAdvisoryError,
  GetAdvisoryResponse,
  DeleteAdvisoryData,
  DeleteAdvisoryError,
  DeleteAdvisoryResponse,
  DownloadAdvisoryData,
  DownloadAdvisoryError,
  DownloadAdvisoryResponse,
  CompletionsData,
  CompletionsError,
  CompletionsResponse,
  AiFlagsError,
  AiFlagsResponse,
  AiToolsError,
  AiToolsResponse,
  AiToolCallData,
  AiToolCallError,
  AiToolCallResponse,
  SearchComponentDepsData,
  SearchComponentDepsError,
  SearchComponentDepsResponse,
  GetComponentDepsData,
  GetComponentDepsError,
  GetComponentDepsResponse,
  SearchComponentRootComponentsData,
  SearchComponentRootComponentsError,
  SearchComponentRootComponentsResponse,
  GetComponentRootComponentsData,
  GetComponentRootComponentsError,
  GetComponentRootComponentsResponse,
  StatusError,
  StatusResponse,
  UploadDatasetData,
  UploadDatasetError,
  UploadDatasetResponse,
  ListImportersError,
  ListImportersResponse,
  GetImporterData,
  GetImporterError,
  GetImporterResponse,
  UpdateImporterData,
  UpdateImporterError,
  UpdateImporterResponse,
  CreateImporterData,
  CreateImporterError,
  CreateImporterResponse,
  DeleteImporterData,
  DeleteImporterError,
  DeleteImporterResponse,
  PatchImporterData,
  PatchImporterError,
  PatchImporterResponse,
  EnableImporterData,
  EnableImporterError,
  EnableImporterResponse,
  ForceRunImporterData,
  ForceRunImporterError,
  ForceRunImporterResponse,
  ListImporterReportsData,
  ListImporterReportsError,
  ListImporterReportsResponse,
  ListLicensesData,
  ListLicensesError,
  ListLicensesResponse,
  ListSpdxLicensesData,
  ListSpdxLicensesError,
  ListSpdxLicensesResponse,
  GetSpdxLicenseData,
  GetSpdxLicenseError,
  GetSpdxLicenseResponse,
  GetLicensesData,
  GetLicensesError,
  GetLicensesResponse,
  GetLicensePurlsData,
  GetLicensePurlsError,
  GetLicensePurlsResponse,
  ListOrganizationsData,
  ListOrganizationsError,
  ListOrganizationsResponse,
  GetOrganizationData,
  GetOrganizationError,
  GetOrganizationResponse,
  ListProductsData,
  ListProductsError,
  ListProductsResponse,
  GetProductData,
  GetProductError,
  GetProductResponse,
  DeleteProductData,
  DeleteProductError,
  DeleteProductResponse,
  ListPurlData,
  ListPurlError,
  ListPurlResponse,
  ListBasePurlsData,
  ListBasePurlsError,
  ListBasePurlsResponse,
  GetBasePurlData,
  GetBasePurlError,
  GetBasePurlResponse,
  ListPurlTypesError,
  ListPurlTypesResponse,
  GetPurlTypeData,
  GetPurlTypeError,
  GetPurlTypeResponse,
  GetBasePurlOfTypeData,
  GetBasePurlOfTypeError,
  GetBasePurlOfTypeResponse,
  GetVersionedPurlOfTypeData,
  GetVersionedPurlOfTypeError,
  GetVersionedPurlOfTypeResponse,
  GetVersionedPurlData,
  GetVersionedPurlError,
  GetVersionedPurlResponse,
  GetPurlData,
  GetPurlError,
  GetPurlResponse,
  ListSbomsData,
  ListSbomsError,
  ListSbomsResponse,
  UploadSbomData,
  UploadSbomError,
  UploadSbomResponse,
  ListRelatedSbomsData,
  ListRelatedSbomsError,
  ListRelatedSbomsResponse,
  CountRelatedSbomsData,
  CountRelatedSbomsError,
  CountRelatedSbomsResponse,
  GetSbomData,
  GetSbomError,
  GetSbomResponse,
  DeleteSbomData,
  DeleteSbomError,
  DeleteSbomResponse,
  GetSbomAdvisoriesData,
  GetSbomAdvisoriesError,
  GetSbomAdvisoriesResponse,
  UpdateSbomLabelsData,
  UpdateSbomLabelsError,
  UpdateSbomLabelsResponse,
  PatchSbomLabelsData,
  PatchSbomLabelsError,
  PatchSbomLabelsResponse,
  ListPackagesData,
  ListPackagesError,
  ListPackagesResponse,
  ListRelatedPackagesData,
  ListRelatedPackagesError,
  ListRelatedPackagesResponse,
  DownloadSbomData,
  DownloadSbomError,
  DownloadSbomResponse,
  GetUserPreferencesData,
  GetUserPreferencesError,
  GetUserPreferencesResponse,
  SetUserPreferencesData,
  SetUserPreferencesError,
  SetUserPreferencesResponse,
  DeleteUserPreferencesData,
  DeleteUserPreferencesError,
  DeleteUserPreferencesResponse,
  ListVulnerabilitiesData,
  ListVulnerabilitiesError,
  ListVulnerabilitiesResponse,
  GetVulnerabilityData,
  GetVulnerabilityError,
  GetVulnerabilityResponse,
  DeleteVulnerabilityData,
  DeleteVulnerabilityError,
  DeleteVulnerabilityResponse,
  ListWeaknessesData,
  ListWeaknessesError,
  ListWeaknessesResponse,
  GetWeaknessData,
  GetWeaknessError,
  GetWeaknessResponse,
} from "./types.gen";

export const client = createClient(createConfig());

export const info = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<InfoResponse, InfoError, ThrowOnError>(
    {
      ...options,
      url: "/.well-known/trustify",
    }
  );
};

/**
 * List advisories
 */
export const listAdvisories = <ThrowOnError extends boolean = false>(
  options?: Options<ListAdvisoriesData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListAdvisoriesResponse,
    ListAdvisoriesError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/advisory",
  });
};

/**
 * Upload a new advisory
 */
export const uploadAdvisory = <ThrowOnError extends boolean = false>(
  options: Options<UploadAdvisoryData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    UploadAdvisoryResponse,
    UploadAdvisoryError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/advisory",
  });
};

/**
 * Replace the labels of an advisory
 */
export const updateAdvisoryLabels = <ThrowOnError extends boolean = false>(
  options: Options<UpdateAdvisoryLabelsData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    UpdateAdvisoryLabelsResponse,
    UpdateAdvisoryLabelsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/advisory/{id}/label",
  });
};

/**
 * Modify existing labels of an advisory
 */
export const patchAdvisoryLabels = <ThrowOnError extends boolean = false>(
  options: Options<PatchAdvisoryLabelsData, ThrowOnError>
) => {
  return (options?.client ?? client).patch<
    PatchAdvisoryLabelsResponse,
    PatchAdvisoryLabelsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/advisory/{id}/label",
  });
};

/**
 * Get an advisory
 */
export const getAdvisory = <ThrowOnError extends boolean = false>(
  options: Options<GetAdvisoryData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetAdvisoryResponse,
    GetAdvisoryError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/advisory/{key}",
  });
};

/**
 * Delete an advisory
 */
export const deleteAdvisory = <ThrowOnError extends boolean = false>(
  options: Options<DeleteAdvisoryData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteAdvisoryResponse,
    DeleteAdvisoryError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/advisory/{key}",
  });
};

/**
 * Download an advisory document
 */
export const downloadAdvisory = <ThrowOnError extends boolean = false>(
  options: Options<DownloadAdvisoryData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    DownloadAdvisoryResponse,
    DownloadAdvisoryError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/advisory/{key}/download",
  });
};

export const completions = <ThrowOnError extends boolean = false>(
  options: Options<CompletionsData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    CompletionsResponse,
    CompletionsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/ai/completions",
  });
};

export const aiFlags = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    AiFlagsResponse,
    AiFlagsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/ai/flags",
  });
};

export const aiTools = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    AiToolsResponse,
    AiToolsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/ai/tools",
  });
};

export const aiToolCall = <ThrowOnError extends boolean = false>(
  options: Options<AiToolCallData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    AiToolCallResponse,
    AiToolCallError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/ai/tools/{name}",
  });
};

export const searchComponentDeps = <ThrowOnError extends boolean = false>(
  options?: Options<SearchComponentDepsData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    SearchComponentDepsResponse,
    SearchComponentDepsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/analysis/dep",
  });
};

export const getComponentDeps = <ThrowOnError extends boolean = false>(
  options: Options<GetComponentDepsData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetComponentDepsResponse,
    GetComponentDepsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/analysis/dep/{key}",
  });
};

export const searchComponentRootComponents = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<SearchComponentRootComponentsData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    SearchComponentRootComponentsResponse,
    SearchComponentRootComponentsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/analysis/root-component",
  });
};

export const getComponentRootComponents = <
  ThrowOnError extends boolean = false,
>(
  options: Options<GetComponentRootComponentsData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetComponentRootComponentsResponse,
    GetComponentRootComponentsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/analysis/root-component/{key}",
  });
};

export const status = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    StatusResponse,
    StatusError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/analysis/status",
  });
};

/**
 * Upload a new dataset
 */
export const uploadDataset = <ThrowOnError extends boolean = false>(
  options: Options<UploadDatasetData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    UploadDatasetResponse,
    UploadDatasetError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/dataset",
  });
};

/**
 * List importer configurations
 */
export const listImporters = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListImportersResponse,
    ListImportersError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/importer",
  });
};

/**
 * Get an importer configuration
 */
export const getImporter = <ThrowOnError extends boolean = false>(
  options: Options<GetImporterData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetImporterResponse,
    GetImporterError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/importer/{name}",
  });
};

/**
 * Update an existing importer configuration
 */
export const updateImporter = <ThrowOnError extends boolean = false>(
  options: Options<UpdateImporterData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    UpdateImporterResponse,
    UpdateImporterError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/importer/{name}",
  });
};

/**
 * Create a new importer configuration
 */
export const createImporter = <ThrowOnError extends boolean = false>(
  options: Options<CreateImporterData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    CreateImporterResponse,
    CreateImporterError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/importer/{name}",
  });
};

/**
 * Delete an importer configuration
 */
export const deleteImporter = <ThrowOnError extends boolean = false>(
  options: Options<DeleteImporterData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteImporterResponse,
    DeleteImporterError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/importer/{name}",
  });
};

/**
 * Update an existing importer configuration
 */
export const patchImporter = <ThrowOnError extends boolean = false>(
  options: Options<PatchImporterData, ThrowOnError>
) => {
  return (options?.client ?? client).patch<
    PatchImporterResponse,
    PatchImporterError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/importer/{name}",
  });
};

/**
 * Update an existing importer configuration
 */
export const enableImporter = <ThrowOnError extends boolean = false>(
  options: Options<EnableImporterData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    EnableImporterResponse,
    EnableImporterError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/importer/{name}/enabled",
  });
};

/**
 * Force an importer to run as soon as possible
 */
export const forceRunImporter = <ThrowOnError extends boolean = false>(
  options: Options<ForceRunImporterData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    ForceRunImporterResponse,
    ForceRunImporterError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/importer/{name}/force",
  });
};

/**
 * Get reports for an importer
 */
export const listImporterReports = <ThrowOnError extends boolean = false>(
  options: Options<ListImporterReportsData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListImporterReportsResponse,
    ListImporterReportsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/importer/{name}/report",
  });
};

/**
 * List licenses
 */
export const listLicenses = <ThrowOnError extends boolean = false>(
  options?: Options<ListLicensesData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListLicensesResponse,
    ListLicensesError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/license",
  });
};

/**
 * List SPDX licenses
 */
export const listSpdxLicenses = <ThrowOnError extends boolean = false>(
  options?: Options<ListSpdxLicensesData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListSpdxLicensesResponse,
    ListSpdxLicensesError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/license/spdx/license",
  });
};

/**
 * Get SPDX license details
 */
export const getSpdxLicense = <ThrowOnError extends boolean = false>(
  options: Options<GetSpdxLicenseData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetSpdxLicenseResponse,
    GetSpdxLicenseError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/license/spdx/license/{id}",
  });
};

/**
 * Retrieve license details
 */
export const getLicenses = <ThrowOnError extends boolean = false>(
  options: Options<GetLicensesData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetLicensesResponse,
    GetLicensesError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/license/{uuid}",
  });
};

/**
 * Retrieve pURLs covered by a license
 */
export const getLicensePurls = <ThrowOnError extends boolean = false>(
  options: Options<GetLicensePurlsData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetLicensePurlsResponse,
    GetLicensePurlsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/license/{uuid}/purl",
  });
};

/**
 * List organizations
 */
export const listOrganizations = <ThrowOnError extends boolean = false>(
  options?: Options<ListOrganizationsData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListOrganizationsResponse,
    ListOrganizationsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/organization",
  });
};

/**
 * Retrieve organization details
 */
export const getOrganization = <ThrowOnError extends boolean = false>(
  options: Options<GetOrganizationData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetOrganizationResponse,
    GetOrganizationError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/organization/{id}",
  });
};

export const listProducts = <ThrowOnError extends boolean = false>(
  options?: Options<ListProductsData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListProductsResponse,
    ListProductsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/product",
  });
};

export const getProduct = <ThrowOnError extends boolean = false>(
  options: Options<GetProductData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetProductResponse,
    GetProductError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/product/{id}",
  });
};

export const deleteProduct = <ThrowOnError extends boolean = false>(
  options: Options<DeleteProductData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteProductResponse,
    DeleteProductError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/product/{id}",
  });
};

/**
 * List fully-qualified pURLs
 */
export const listPurl = <ThrowOnError extends boolean = false>(
  options?: Options<ListPurlData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListPurlResponse,
    ListPurlError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/purl",
  });
};

/**
 * List base versionless pURLs
 */
export const listBasePurls = <ThrowOnError extends boolean = false>(
  options?: Options<ListBasePurlsData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListBasePurlsResponse,
    ListBasePurlsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/purl/base",
  });
};

/**
 * Retrieve details about a base versionless pURL
 */
export const getBasePurl = <ThrowOnError extends boolean = false>(
  options: Options<GetBasePurlData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetBasePurlResponse,
    GetBasePurlError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/purl/base/{key}",
  });
};

/**
 * List known pURL types
 */
export const listPurlTypes = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListPurlTypesResponse,
    ListPurlTypesError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/purl/type",
  });
};

/**
 * Retrieve details about a pURL type
 */
export const getPurlType = <ThrowOnError extends boolean = false>(
  options: Options<GetPurlTypeData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetPurlTypeResponse,
    GetPurlTypeError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/purl/type/{type}",
  });
};

/**
 * Retrieve base pURL details of a type
 */
export const getBasePurlOfType = <ThrowOnError extends boolean = false>(
  options: Options<GetBasePurlOfTypeData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetBasePurlOfTypeResponse,
    GetBasePurlOfTypeError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/purl/type/{type}/{namespace_and_name}",
  });
};

/**
 * Retrieve versioned pURL details of a type
 */
export const getVersionedPurlOfType = <ThrowOnError extends boolean = false>(
  options: Options<GetVersionedPurlOfTypeData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetVersionedPurlOfTypeResponse,
    GetVersionedPurlOfTypeError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/purl/type/{type}/{namespace_and_name}@{version}",
  });
};

/**
 * Retrieve details of a versioned, non-qualified pURL
 */
export const getVersionedPurl = <ThrowOnError extends boolean = false>(
  options: Options<GetVersionedPurlData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetVersionedPurlResponse,
    GetVersionedPurlError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/purl/version/{key}",
  });
};

/**
 * Retrieve details of a fully-qualified pURL
 */
export const getPurl = <ThrowOnError extends boolean = false>(
  options: Options<GetPurlData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetPurlResponse,
    GetPurlError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/purl/{key}",
  });
};

export const listSboms = <ThrowOnError extends boolean = false>(
  options?: Options<ListSbomsData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListSbomsResponse,
    ListSbomsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/sbom",
  });
};

/**
 * Upload a new SBOM
 */
export const uploadSbom = <ThrowOnError extends boolean = false>(
  options: Options<UploadSbomData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    UploadSbomResponse,
    UploadSbomError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/sbom",
  });
};

/**
 * Find all SBOMs containing the provided package.
 * The package can be provided either via a PURL or using the ID of a package as returned by
 * other APIs, but not both.
 */
export const listRelatedSboms = <ThrowOnError extends boolean = false>(
  options?: Options<ListRelatedSbomsData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListRelatedSbomsResponse,
    ListRelatedSbomsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/sbom/by-package",
  });
};

/**
 * Count all SBOMs containing the provided packages.
 * The packages can be provided either via a PURL or using the ID of a package as returned by
 * other APIs, but not both.
 */
export const countRelatedSboms = <ThrowOnError extends boolean = false>(
  options: Options<CountRelatedSbomsData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    CountRelatedSbomsResponse,
    CountRelatedSbomsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/sbom/count-by-package",
  });
};

export const getSbom = <ThrowOnError extends boolean = false>(
  options: Options<GetSbomData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetSbomResponse,
    GetSbomError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/sbom/{id}",
  });
};

export const deleteSbom = <ThrowOnError extends boolean = false>(
  options: Options<DeleteSbomData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteSbomResponse,
    DeleteSbomError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/sbom/{id}",
  });
};

export const getSbomAdvisories = <ThrowOnError extends boolean = false>(
  options: Options<GetSbomAdvisoriesData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetSbomAdvisoriesResponse,
    GetSbomAdvisoriesError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/sbom/{id}/advisory",
  });
};

/**
 * Replace the labels of an SBOM
 */
export const updateSbomLabels = <ThrowOnError extends boolean = false>(
  options: Options<UpdateSbomLabelsData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    UpdateSbomLabelsResponse,
    UpdateSbomLabelsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/sbom/{id}/label",
  });
};

/**
 * Modify existing labels of an SBOM
 */
export const patchSbomLabels = <ThrowOnError extends boolean = false>(
  options: Options<PatchSbomLabelsData, ThrowOnError>
) => {
  return (options?.client ?? client).patch<
    PatchSbomLabelsResponse,
    PatchSbomLabelsError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/sbom/{id}/label",
  });
};

/**
 * Search for packages of an SBOM
 */
export const listPackages = <ThrowOnError extends boolean = false>(
  options: Options<ListPackagesData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListPackagesResponse,
    ListPackagesError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/sbom/{id}/packages",
  });
};

/**
 * Search for related packages in an SBOM
 */
export const listRelatedPackages = <ThrowOnError extends boolean = false>(
  options: Options<ListRelatedPackagesData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListRelatedPackagesResponse,
    ListRelatedPackagesError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/sbom/{id}/related",
  });
};

export const downloadSbom = <ThrowOnError extends boolean = false>(
  options: Options<DownloadSbomData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    DownloadSbomResponse,
    DownloadSbomError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/sbom/{key}/download",
  });
};

/**
 * Get user preferences
 */
export const getUserPreferences = <ThrowOnError extends boolean = false>(
  options: Options<GetUserPreferencesData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetUserPreferencesResponse,
    GetUserPreferencesError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/userPreference/{key}",
  });
};

/**
 * Set user preferences
 */
export const setUserPreferences = <ThrowOnError extends boolean = false>(
  options: Options<SetUserPreferencesData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    SetUserPreferencesResponse,
    SetUserPreferencesError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/userPreference/{key}",
  });
};

/**
 * Delete user preferences
 */
export const deleteUserPreferences = <ThrowOnError extends boolean = false>(
  options: Options<DeleteUserPreferencesData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteUserPreferencesResponse,
    DeleteUserPreferencesError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/userPreference/{key}",
  });
};

/**
 * List vulnerabilities
 */
export const listVulnerabilities = <ThrowOnError extends boolean = false>(
  options?: Options<ListVulnerabilitiesData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListVulnerabilitiesResponse,
    ListVulnerabilitiesError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/vulnerability",
  });
};

/**
 * Retrieve vulnerability details
 */
export const getVulnerability = <ThrowOnError extends boolean = false>(
  options: Options<GetVulnerabilityData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetVulnerabilityResponse,
    GetVulnerabilityError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/vulnerability/{id}",
  });
};

/**
 * Delete vulnerability
 */
export const deleteVulnerability = <ThrowOnError extends boolean = false>(
  options: Options<DeleteVulnerabilityData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteVulnerabilityResponse,
    DeleteVulnerabilityError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/vulnerability/{id}",
  });
};

/**
 * List weaknesses
 */
export const listWeaknesses = <ThrowOnError extends boolean = false>(
  options?: Options<ListWeaknessesData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListWeaknessesResponse,
    ListWeaknessesError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/weakness",
  });
};

/**
 * Retrieve weakness details
 */
export const getWeakness = <ThrowOnError extends boolean = false>(
  options: Options<GetWeaknessData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetWeaknessResponse,
    GetWeaknessError,
    ThrowOnError
  >({
    ...options,
    url: "/api/v1/weakness/{id}",
  });
};
