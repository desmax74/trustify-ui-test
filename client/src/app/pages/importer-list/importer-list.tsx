import React from "react";

import { AxiosError } from "axios";
import dayjs from "dayjs";

import {
  Button,
  ButtonVariant,
  Label,
  Modal,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { LogViewer, LogViewerSearch } from "@patternfly/react-log-viewer";
import {
  ActionsColumn,
  Caption,
  ExpandableRowContent,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";

import {
  ConfirmDialog,
  ConfirmDialogProps,
} from "@app/components/ConfirmDialog";
import { NotificationsContext } from "@app/components/NotificationsContext";
import {
  useFetchImporterReports,
  useFetchImporters,
  useUpdateImporterMutation,
} from "@app/queries/importers";
import { formatDateTime, getAxiosErrorMessage } from "@app/utils/utils";

import { client } from "@app/axios-config/apiInit";
import {
  forceRunImporter,
  Importer,
  ImporterConfiguration,
  Message,
  SbomImporter,
} from "@app/client";
import { FilterToolbar, FilterType } from "@app/components/FilterToolbar";
import { IconedStatus } from "@app/components/IconedStatus";
import { SimplePagination } from "@app/components/SimplePagination";
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from "@app/components/TableControls";
import { useLocalTableControls } from "@app/hooks/table-controls";

import { ANSICOLOR } from "@app/Constants";
import { ImporterProgress } from "./components/importer-progress";
import { ImporterStatusIcon } from "./components/importer-status-icon";

export const ImporterList: React.FC = () => {
  const { pushNotification } = React.useContext(NotificationsContext);

  // Actions that each row can trigger
  type RowAction = "enable" | "disable" | "run";
  const [selectedRow, setSelectedRow] = React.useState<Importer | null>(null);
  const [selectedRowAction, setSelectedRowAction] =
    React.useState<RowAction | null>(null);

  const prepareActionOnRow = (action: RowAction, row: Importer) => {
    setSelectedRowAction(action);
    setSelectedRow(row);
  };

  const [refetchInterval, setRefetchInterval] = React.useState(10000);
  const { importers, isFetching, fetchError } = useFetchImporters(
    false,
    refetchInterval
  );

  // Fetch importers with more frecuency in case any is "running"
  React.useEffect(() => {
    const isSomeTaskRunning = importers.some(
      (item) => item.state === "running"
    );
    if (isSomeTaskRunning) {
      setRefetchInterval(5000);
    } else if (refetchInterval !== 10000) {
      setRefetchInterval(10000);
    }
  }, [importers]);

  // Enable/Disable Importer

  const onEnableDisableError = (_error: AxiosError) => {
    pushNotification({
      title: "Error while enabling/disabling the Importer",
      variant: "danger",
    });
  };

  const { mutate: updateImporter } = useUpdateImporterMutation(
    () => {},
    onEnableDisableError
  );

  const execEnableDisableImporter = (row: Importer, enable: boolean) => {
    const importerType = Object.keys(row.configuration ?? {})[0];
    const currentConfigValues = (row.configuration as any)[
      importerType
    ] as SbomImporter;

    const newConfigValues: SbomImporter = {
      ...currentConfigValues,
      disabled: !enable,
    };

    const payload = {
      [importerType]: newConfigValues,
    } as ImporterConfiguration;

    updateImporter({
      importerName: row.name,
      configuration: payload,
    });
  };

  // Run Importer

  const onRunImporterSuccess = () => {
    pushNotification({
      title: "Importer scheduled to run as soon as possible",
      variant: "success",
    });
  };

  const onRunImporterError = (error: AxiosError) => {
    pushNotification({
      title: getAxiosErrorMessage(error),
      variant: "danger",
    });
  };

  const execRunImporter = (id: string) => {
    forceRunImporter({ client, path: { name: id }, body: true })
      .then(onRunImporterSuccess)
      .catch(onRunImporterError);
  };

  // Table config
  const tableControls = useLocalTableControls({
    tableName: "importers-table",
    idProperty: "name",
    items: importers,
    columnNames: {
      name: "Name",
      type: "Type",
      description: "Description",
      source: "Source",
      period: "Period",
      state: "State",
    },
    hasActionsColumn: true,
    isSortEnabled: true,
    sortableColumns: ["name"],
    getSortValues: (item) => ({
      name: item.name,
    }),
    isPaginationEnabled: true,
    isExpansionEnabled: true,
    expandableVariant: "single",
    isFilterEnabled: true,
    filterCategories: [
      {
        categoryKey: "name",
        title: "Name",
        type: FilterType.search,
        placeholderText: "Search by name...",
        getItemValue: (item) => item.name || "",
      },
    ],
  });

  const {
    currentPageItems,
    numRenderedColumns,
    propHelpers: {
      toolbarProps,
      filterToolbarProps,
      paginationToolbarItemProps,
      paginationProps,
      tableProps,
      getThProps,
      getTrProps,
      getTdProps,
    },
    expansionDerivedState: { isCellExpanded },
  } = tableControls;

  // Dialog confirm config
  let confirmDialogProps: Pick<
    ConfirmDialogProps,
    | "title"
    | "titleIconVariant"
    | "message"
    | "confirmBtnVariant"
    | "confirmBtnLabel"
    | "cancelBtnLabel"
  > | null;
  switch (selectedRowAction) {
    case "enable":
      confirmDialogProps = {
        title: "Enable Importer",
        titleIconVariant: "info",
        message: `Are you sure you want to enable the Importer ${selectedRow?.name}?`,
        confirmBtnVariant: ButtonVariant.primary,
        confirmBtnLabel: "Enable",
        cancelBtnLabel: "Cancel",
      };
      break;
    case "disable":
      confirmDialogProps = {
        title: "Disable Importer",
        titleIconVariant: "info",
        message: `Are you sure you want to disable the Importer ${selectedRow?.name}?`,
        confirmBtnVariant: ButtonVariant.primary,
        confirmBtnLabel: "Disable",
        cancelBtnLabel: "Cancel",
      };
      break;
    case "run":
      confirmDialogProps = {
        title: "Run Importer",
        titleIconVariant: "info",
        message: `Are you sure you want to run the Importer ${selectedRow?.name}?`,
        confirmBtnVariant: ButtonVariant.primary,
        confirmBtnLabel: "Run",
        cancelBtnLabel: "Cancel",
      };
      break;
    default:
      confirmDialogProps = null;
      break;
  }

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Importers</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <div
          style={{
            backgroundColor: "var(--pf-v5-global--BackgroundColor--100)",
          }}
        >
          <Toolbar {...toolbarProps}>
            <ToolbarContent>
              <FilterToolbar showFiltersSideBySide {...filterToolbarProps} />
              <ToolbarItem {...paginationToolbarItemProps}>
                <SimplePagination
                  idPrefix="importer-table"
                  isTop
                  paginationProps={paginationProps}
                />
              </ToolbarItem>
            </ToolbarContent>
          </Toolbar>

          <Table {...tableProps} aria-label="CVEs table">
            <Thead>
              <Tr>
                <TableHeaderContentWithControls {...tableControls}>
                  <Th {...getThProps({ columnKey: "name" })} />
                  <Th {...getThProps({ columnKey: "type" })} />
                  <Th {...getThProps({ columnKey: "description" })} />
                  <Th {...getThProps({ columnKey: "source" })} />
                  <Th {...getThProps({ columnKey: "period" })} />
                  <Th {...getThProps({ columnKey: "state" })} />
                </TableHeaderContentWithControls>
              </Tr>
            </Thead>
            <ConditionalTableBody
              isLoading={isFetching}
              isError={!!fetchError}
              isNoData={importers.length === 0}
              numRenderedColumns={numRenderedColumns}
            >
              {currentPageItems?.map((item, rowIndex) => {
                const importerType = Object.keys(item.configuration ?? {})[0];
                const configValues = (item.configuration as any)[
                  importerType
                ] as SbomImporter;
                const isImporterEnabled = configValues?.disabled === false;

                return (
                  <Tbody key={item.name}>
                    <Tr {...getTrProps({ item })}>
                      <TableRowContentWithControls
                        {...tableControls}
                        item={item}
                        rowIndex={rowIndex}
                      >
                        <Td
                          width={15}
                          modifier="truncate"
                          {...getTdProps({ columnKey: "name" })}
                        >
                          {item.name}
                        </Td>
                        <Td
                          width={10}
                          modifier="truncate"
                          {...getTdProps({ columnKey: "type" })}
                        >
                          {importerType}
                        </Td>
                        <Td
                          width={20}
                          modifier="truncate"
                          {...getTdProps({ columnKey: "description" })}
                        >
                          {configValues?.description}
                        </Td>
                        <Td
                          width={20}
                          modifier="truncate"
                          {...getTdProps({ columnKey: "source" })}
                        >
                          {configValues?.source}
                        </Td>
                        <Td
                          width={10}
                          modifier="truncate"
                          {...getTdProps({ columnKey: "period" })}
                        >
                          {configValues?.period}
                        </Td>
                        <Td
                          width={10}
                          modifier="truncate"
                          {...getTdProps({ columnKey: "state" })}
                        >
                          {item.state && isImporterEnabled ? (
                            item.state === "running" && item.progress ? (
                              <ImporterProgress value={item.progress} />
                            ) : (
                              <ImporterStatusIcon state={item.state} />
                            )
                          ) : (
                            <Label color="orange">Disabled</Label>
                          )}
                        </Td>
                        <Td isActionCell>
                          <ActionsColumn
                            items={[
                              ...(isImporterEnabled
                                ? [
                                    {
                                      title: "Run",
                                      onClick: () => {
                                        prepareActionOnRow("run", item);
                                      },
                                    },
                                  ]
                                : []),
                              ...(!isImporterEnabled
                                ? [
                                    {
                                      title: "Enable",
                                      onClick: () => {
                                        prepareActionOnRow("enable", item);
                                      },
                                    },
                                  ]
                                : [
                                    {
                                      title: "Disable",
                                      onClick: () => {
                                        prepareActionOnRow("disable", item);
                                      },
                                    },
                                  ]),
                            ]}
                          />
                        </Td>
                      </TableRowContentWithControls>
                    </Tr>
                    {isCellExpanded(item) ? (
                      <Tr isExpanded>
                        <Td colSpan={7}>
                          <div className="pf-v5-u-m-md">
                            <ExpandableRowContent>
                              <ImporterExpandedArea importer={item} />
                            </ExpandableRowContent>
                          </div>
                        </Td>
                      </Tr>
                    ) : null}
                  </Tbody>
                );
              })}
            </ConditionalTableBody>
          </Table>
          <SimplePagination
            idPrefix="importer-table"
            isTop={false}
            isCompact
            paginationProps={paginationProps}
          />
        </div>
      </PageSection>

      {selectedRowAction && confirmDialogProps && (
        <ConfirmDialog
          {...confirmDialogProps}
          isOpen={true}
          onCancel={() => setSelectedRowAction(null)}
          onClose={() => setSelectedRowAction(null)}
          onConfirm={() => {
            if (selectedRow) {
              switch (selectedRowAction) {
                case "enable":
                  execEnableDisableImporter(selectedRow, true);
                  break;
                case "disable":
                  execEnableDisableImporter(selectedRow, false);
                  break;
                case "run":
                  execRunImporter(selectedRow.name);
                  break;
                default:
                  break;
              }
            }

            setSelectedRow(null);
            setSelectedRowAction(null);
          }}
        />
      )}
    </>
  );
};

const messagesToLogData = (messages: {
  [key: string]: {
    [key: string]: Array<Message>;
  };
}) => {
  return Object.entries(messages).map(([groupKey, value]) => {
    return Object.entries(value)
      .map(([objectKey, objectValue]) => {
        return {
          title: `${groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}: "${objectKey}"`,
          body: objectValue
            .map((item) => {
              let color;
              switch (item.severity) {
                case "none":
                  color = ANSICOLOR.green;
                  break;
                case "low":
                  color = ANSICOLOR.cyan;
                  break;
                case "medium":
                  color = ANSICOLOR.yellow;
                  break;
                case "high":
                  color = ANSICOLOR.lightBlue;
                  break;
                case "critical":
                  color = ANSICOLOR.red;
                  break;
                default:
                  break;
              }
              return `${color ?? ""}${item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}: ${ANSICOLOR.defaultForegroundColorAtStartup} ${item.message}`;
            })
            .join(ANSICOLOR.endLine),
        };
      })
      .map((item) => {
        return `${ANSICOLOR.underline}${item.title}${ANSICOLOR.reset}${ANSICOLOR.endLine}${item.body}`;
      })
      .join(`${ANSICOLOR.endLine}${ANSICOLOR.endLine}`);
  });
};

interface TableReportData {
  isRunning: boolean;
  id: string;
  startDate?: string;
  endDate?: string;
  duration?: number;
  numberOfItems?: number;
  error?: string;
  messages?: {
    [key: string]: {
      [key: string]: Array<Message>;
    };
  };
}

interface ImporterExpandedAreaProps {
  importer: Importer;
}

export const ImporterExpandedArea: React.FC<ImporterExpandedAreaProps> = ({
  importer,
}) => {
  const [logData, setLogData] = React.useState<string[]>([]);
  const [isLogModalOpen, setIsLogModalOpen] = React.useState(false);
  const toggleLogModal = () => setIsLogModalOpen(!isLogModalOpen);

  const {
    result: { data: reports },
    isFetching,
    fetchError,
  } = useFetchImporterReports(importer.name);

  const tableData = React.useMemo(() => {
    const currentTask: TableReportData = {
      isRunning: true,
      id: "root",
      startDate: undefined,
      endDate: undefined,
      duration: importer.progress?.estimatedSecondsRemaining
        ? importer.progress?.estimatedSecondsRemaining * 1000
        : undefined,
      numberOfItems: importer.progress?.current,
      error: undefined,
      messages: undefined,
    };

    const reportsMapped = reports.map((item) => {
      let duration: number | undefined;
      if (item.report?.startDate && item.report.endDate) {
        const fromDate = dayjs(item.report.startDate);
        const toDate = dayjs(item.report.endDate);
        duration = toDate.diff(fromDate);
      }

      const result: TableReportData = {
        isRunning: false,
        id: item.id,
        startDate: item.report?.startDate,
        endDate: item.report?.endDate,
        duration: duration,
        numberOfItems: item.report?.numberOfItems,
        error: item.error ?? undefined,
        messages: item.report?.messages,
      };
      return result;
    });
    return [
      ...(importer.state === "running" ? [currentTask] : []),
      ...reportsMapped,
    ];
  }, [importer, reports]);

  const tableControls = useLocalTableControls({
    variant: "compact",
    tableName: "report-table",
    idProperty: "id",
    items: tableData,
    columnNames: {
      startDate: "Start date",
      endDate: "End date",
      numberOfItems: "Number of items",
      output: "Output",
      duration: "Duration",
    },
    isPaginationEnabled: true,
    initialItemsPerPage: 5,
    isSortEnabled: true,
    sortableColumns: ["startDate", "endDate"],
    getSortValues: (report) => ({
      startDate: report.startDate ? dayjs(report.startDate).valueOf() : 0,
      endDate: report.endDate ? dayjs(report.endDate).valueOf() : 0,
    }),
    isFilterEnabled: false,
    isExpansionEnabled: false,
  });

  const {
    currentPageItems,
    numRenderedColumns,
    propHelpers: {
      toolbarProps,
      tableProps,
      paginationToolbarItemProps,
      paginationProps,
      getThProps,
      getTrProps,
      getTdProps,
    },
  } = tableControls;

  return (
    <>
      <Toolbar {...toolbarProps}>
        <ToolbarContent>
          <ToolbarItem {...paginationToolbarItemProps}>
            <SimplePagination
              idPrefix="report-table"
              isTop
              paginationProps={paginationProps}
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      <Table {...tableProps} aria-label="Report table">
        <Caption>Importer reports</Caption>
        <Thead>
          <Tr>
            <TableHeaderContentWithControls {...tableControls}>
              <Th {...getThProps({ columnKey: "startDate" })} />
              <Th {...getThProps({ columnKey: "endDate" })} />
              <Th {...getThProps({ columnKey: "numberOfItems" })} />
              <Th {...getThProps({ columnKey: "output" })} />
              <Th {...getThProps({ columnKey: "duration" })} />
            </TableHeaderContentWithControls>
          </Tr>
        </Thead>
        <ConditionalTableBody
          isLoading={isFetching}
          isError={!!fetchError}
          isNoData={tableData?.length === 0}
          numRenderedColumns={numRenderedColumns}
        >
          {currentPageItems?.map((item, rowIndex) => {
            const LogButton = ({ children }: { children: React.ReactNode }) => {
              if (item.messages) {
                return (
                  <Button
                    variant="link"
                    onClick={() => {
                      const newLogData = messagesToLogData(item.messages ?? {});
                      setLogData(newLogData);
                      toggleLogModal();
                    }}
                  >
                    {children}
                  </Button>
                );
              } else {
                return children;
              }
            };

            return (
              <Tbody key={item.id}>
                <Tr {...getTrProps({ item })}>
                  <TableRowContentWithControls
                    {...tableControls}
                    item={item}
                    rowIndex={rowIndex}
                  >
                    <Td
                      width={15}
                      modifier="truncate"
                      {...getTdProps({ columnKey: "startDate" })}
                    >
                      {formatDateTime(item.startDate)}
                    </Td>
                    <Td
                      width={15}
                      modifier="truncate"
                      {...getTdProps({ columnKey: "endDate" })}
                    >
                      {formatDateTime(item.endDate)}
                    </Td>
                    <Td
                      width={10}
                      modifier="truncate"
                      {...getTdProps({ columnKey: "numberOfItems" })}
                    >
                      {item.numberOfItems}
                    </Td>
                    <Td
                      width={40}
                      modifier="truncate"
                      {...getTdProps({ columnKey: "output" })}
                    >
                      {item.isRunning ? (
                        <ImporterStatusIcon state="running" />
                      ) : (
                        <LogButton>
                          {item.error ? (
                            <IconedStatus status="danger" label={item.error} />
                          ) : (
                            <IconedStatus
                              status="success"
                              label="Finished successfully"
                            />
                          )}
                        </LogButton>
                      )}
                    </Td>
                    <Td
                      width={20}
                      modifier="truncate"
                      {...getTdProps({ columnKey: "duration" })}
                    >
                      {item.duration
                        ? item.isRunning
                          ? `Time remaining: ${dayjs.duration(item.duration).humanize()}`
                          : `Run for: ${dayjs.duration(item.duration).humanize()}`
                        : ""}
                    </Td>
                  </TableRowContentWithControls>
                </Tr>
              </Tbody>
            );
          })}
        </ConditionalTableBody>
      </Table>
      <SimplePagination
        idPrefix="report-table"
        isTop={false}
        isCompact
        paginationProps={paginationProps}
      />

      <Modal
        title="Log"
        variant="large"
        isOpen={isLogModalOpen}
        onClose={toggleLogModal}
        actions={[
          <Button key="cancel" variant="link" onClick={toggleLogModal}>
            Close
          </Button>,
        ]}
      >
        <LogViewer
          hasLineNumbers={false}
          height={400}
          data={logData}
          theme="dark"
          toolbar={
            <Toolbar>
              <ToolbarContent>
                <ToolbarItem>
                  <LogViewerSearch
                    placeholder="Search value"
                    minSearchChars={1}
                  />
                </ToolbarItem>
              </ToolbarContent>
            </Toolbar>
          }
        />
      </Modal>
    </>
  );
};
