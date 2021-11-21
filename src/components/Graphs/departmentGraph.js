import { forEach, merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader, Stack } from "@mui/material";
// utils
import { fNumber } from "../../utils/formatNumber.js";
//
import BaseOptionChart from "../charts/BaseOptionChart";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";

import {
  departmentsContext,
  associatesContext,
} from "../../utils/context/contexts.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.js";
// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

export default function DepartmentGraph() {
  const { allDepartments } = useContext(departmentsContext);
  const { associates, setAssociates } = useContext(associatesContext);

  const [chartData, setChartData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getDepartment = () => {
      const CHART_DATA = [];
      for (const dep of allDepartments.flat(2)) {
        // const ress = await fetchDetails(dep);
        // CHART_DATA1.push(ress.docs.length);
        CHART_DATA.push(fetchDetails(dep));
      }
      setChartData(CHART_DATA);
      setLoading(false);
    };
    getDepartment();
  }, []);

  const fetchDetails = (dep) => {
    const filtered = associates.filter(
      (associate) => associate.Department == dep
    );

    // const citiesRef = collection(db, "Associates");
    // const q = query(citiesRef, where("Department", "==", dep));

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    // });

    // return querySnapshot;
    return filtered.length;
  };

  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
    labels: allDepartments.flat(2),
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: "center" },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <Card>
      <CardHeader title="Associates per Department" />
      {loading && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          mb={5}
        >
          <CircularProgress />
        </Stack>
      )}
      {chartData && (
        <ChartWrapperStyle dir="ltr">
          <ReactApexChart
            type="pie"
            series={chartData}
            options={chartOptions}
            height={280}
          />
        </ChartWrapperStyle>
      )}
    </Card>
  );
}