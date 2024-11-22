import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Chart,
  ChartAxis,
  ChartBar,
  ChartLabel,
  ChartLegend,
  ChartStack,
  ChartThemeColor,
  ChartTooltip,
} from "@patternfly/react-charts";
import {
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Grid,
  GridItem,
  Stack,
  StackItem,
  TextContent,
} from "@patternfly/react-core";

import { severityList } from "@app/api/model-utils";
import { SbomHead, Severity } from "@app/client";
import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { useVulnerabilitiesOfSboms } from "@app/hooks/domain-controls/useVulnerabilitiesOfSbom";
import { useFetchSBOMs } from "@app/queries/sboms";
import { useFetchVulnerabilities } from "@app/queries/vulnerabilities";
import { formatDate } from "@app/utils/utils";

interface Legend {
  severity: Severity;
}

const LEGENDS: Legend[] = [
  { severity: "critical" },
  { severity: "high" },
  { severity: "medium" },
  { severity: "low" },
  { severity: "none" },
];

export const MonitoringSection: React.FC = () => {
  const navigate = useNavigate();

  //

  const {
    result: { data: barchartSboms, total: totalSboms },
    isFetching: isFetchingBarchartSboms,
    fetchError: fetchErrorBarchartSboms,
  } = useFetchSBOMs(
    {
      page: { pageNumber: 1, itemsPerPage: 10 },
      sort: { field: "published", direction: "desc" },
    },
    true
  );

  const {
    data: barchartSbomsVulnerabilities,
    isFetching: isFetchingBarchartSbomsVulnerabilities,
    fetchError: fetchErrorBarchartSbomsVulnerabilities,
  } = useVulnerabilitiesOfSboms(barchartSboms.map((e) => e.id));

  const showTickValues = barchartSbomsVulnerabilities
    .map((e) => e.summary.vulnerabilityStatus.affected.total)
    .every((item) => item === 0);

  const generateSbomBarName = (sbom: SbomHead, index: number) => {
    return `${" ".repeat(index + 1)}${sbom.name}`;
  };

  //

  const {
    result: { data: vulnerabilities, total: totalVulnerabilities },
    isFetching: isFetchingVulnerabilities,
    fetchError: fetchErrorVulnerabilities,
  } = useFetchVulnerabilities(
    {
      page: { pageNumber: 1, itemsPerPage: 10 },
      sort: { field: "published", direction: "desc" },
    },
    true
  );

  return (
    <Card>
      <CardTitle>Your dashboard</CardTitle>
      <CardBody>
        <Grid>
          <GridItem md={6}>
            <LoadingWrapper
              isFetching={
                isFetchingBarchartSboms ||
                isFetchingBarchartSbomsVulnerabilities
              }
              fetchError={
                fetchErrorBarchartSboms ||
                fetchErrorBarchartSbomsVulnerabilities.some((e) => !!e)
              }
            >
              <Stack hasGutter>
                <StackItem>
                  <TextContent>
                    Below is a summary of CVE status for your last 10 ingested
                    SBOMs. You can click on the SBOM name or CVE severity number
                    below to be taken to their respective details page.
                  </TextContent>
                </StackItem>
                <StackItem>
                  <div style={{ height: 320 }}>
                    <Chart
                      ariaDesc="SBOM summary status"
                      domainPadding={{ x: [30, 25] }}
                      legendData={LEGENDS.map((legend) => {
                        const severity = severityList[legend.severity];
                        return { name: severity.name };
                      })}
                      legendPosition="bottom-left"
                      height={375}
                      name="sbom-summary-status"
                      padding={{
                        bottom: 75,
                        left: 330,
                        right: 50,
                        top: 50,
                      }}
                      themeColor={ChartThemeColor.multiOrdered}
                      width={700}
                      legendComponent={
                        <ChartLegend
                          y={10}
                          x={300}
                          colorScale={LEGENDS.map((legend) => {
                            const severity = severityList[legend.severity];
                            return severity.color.value;
                          })}
                        />
                      }
                    >
                      <ChartAxis
                        label="Products"
                        axisLabelComponent={
                          <ChartLabel dx={0} x={15} y={140} />
                        }
                        tickLabelComponent={
                          <ChartLabel
                            className="pf-v5-c-button pf-m-link pf-m-inline"
                            style={[{ fill: "#0066cc" }]}
                            events={{
                              onClick: (event) => {
                                const sbomName = (event.target as any)
                                  .innerHTML as string | null;
                                const sbom = barchartSboms.find(
                                  (item, index) => {
                                    return (
                                      generateSbomBarName(item, index) ===
                                      sbomName
                                    );
                                  }
                                );
                                if (sbom) {
                                  navigate(`/sboms/${sbom.id}`);
                                }
                              },
                            }}
                          />
                        }
                      />
                      <ChartAxis
                        dependentAxis
                        showGrid
                        tickValues={
                          showTickValues
                            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                            : undefined
                        }
                        label="Vulnerabilities by Severity"
                        fixLabelOverlap={true}
                      />
                      <ChartStack
                        horizontal
                        colorScale={LEGENDS.map((legend) => {
                          const severity = severityList[legend.severity];
                          return severity.color.value;
                        })}
                      >
                        {LEGENDS.map((legend) => {
                          const severityData = severityList[legend.severity];
                          return (
                            <ChartBar
                              key={legend.severity}
                              labelComponent={
                                <ChartTooltip constrainToVisibleArea />
                              }
                              data={barchartSbomsVulnerabilities.map(
                                (
                                  {
                                    summary: {
                                      vulnerabilityStatus: { affected },
                                    },
                                  },
                                  index
                                ) => {
                                  const sbom = barchartSboms[index];

                                  const severity = legend.severity;
                                  const count = affected.severities[severity];
                                  return {
                                    x: generateSbomBarName(sbom, index),
                                    y: count,
                                    label: `${severityData.name}: ${count}`,
                                  };
                                }
                              )}
                            />
                          );
                        })}
                      </ChartStack>
                    </Chart>
                  </div>
                </StackItem>
              </Stack>
            </LoadingWrapper>
          </GridItem>
          <GridItem md={6}>
            <LoadingWrapper
              isFetching={isFetchingVulnerabilities}
              fetchError={fetchErrorVulnerabilities}
            >
              <Grid hasGutter>
                <GridItem md={6}>
                  <DescriptionList>
                    <DescriptionListGroup>
                      <DescriptionListTerm>
                        Last SBOM ingested
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        <Stack>
                          <StackItem>
                            {formatDate(barchartSboms?.[0]?.published)}
                          </StackItem>
                          <StackItem>
                            <Link to={`/sboms/${barchartSboms?.[0]?.id}`}>
                              {barchartSboms?.[0]?.name}
                            </Link>
                          </StackItem>
                        </Stack>
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  </DescriptionList>
                </GridItem>
                <GridItem md={6}>
                  <DescriptionList>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Total SBOMs</DescriptionListTerm>
                      <DescriptionListDescription>
                        {totalSboms}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  </DescriptionList>
                </GridItem>
                <GridItem md={6}>
                  <DescriptionList>
                    <DescriptionListGroup>
                      <DescriptionListTerm>
                        Last Vulnerability ingested
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        <Stack>
                          <StackItem>
                            {formatDate(vulnerabilities?.[0]?.published)}
                          </StackItem>
                          <StackItem>
                            {vulnerabilities?.[0]?.identifier}
                          </StackItem>
                        </Stack>
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  </DescriptionList>
                </GridItem>
                <GridItem md={6}>
                  <DescriptionList>
                    <DescriptionListGroup>
                      <DescriptionListTerm>
                        Total Vulnerabilities
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        {totalVulnerabilities}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  </DescriptionList>
                </GridItem>
              </Grid>
            </LoadingWrapper>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};
