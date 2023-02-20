import { useList } from "@pankod/refine-core";
import ReactApexChart from 'react-apexcharts'
import { Typography, Box, Stack } from '@pankod/refine-mui'
import { ArrowCircleUpRounded } from '@mui/icons-material'
import { TotalRevenueOptions, TotalRevenueSeries } from '../components/charts/chart.config'

const Home = () => {
    
    const { data, isLoading, isError } = useList({
        resource: "properties",
        config: {
            hasPagination: false
        },

    });
    
    const allProperties = data?.data ?? [];
    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Something went wrong!</Typography>;

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Dashboard
            </Typography>

            <Stack
                mt="25px"
                width="100%"
                direction={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <Box
                    p={4}
                    flex={1}
                    bgcolor="#fcfcfc"
                    id="chart"
                    display="flex"
                    flexDirection="column"
                    borderRadius="15px"
                >
                    <Typography fontSize="18px" fontWeight={600} color="#11142d">
                        Total Revenue
                    </Typography>

                    <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
                        <Typography fontSize={28} fontWeight={700} color="#11142d">
                            ${allProperties.reduce((sum,property) => sum = sum+((property.price * property.quantity) + (property.price * property.quantity) * 0.1), 0).toLocaleString()}
                        </Typography>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <ArrowCircleUpRounded sx={{ fontSize: 25, color: '#475be8' }} />
                        </Stack>

                    </Stack>
                    <ReactApexChart
                        series={TotalRevenueSeries}
                        type="bar"
                        height={310}

                        options={TotalRevenueOptions}
                    />
                </Box>
                <Box
                    p={4}
                    bgcolor="#fcfcfc"
                    id="chart"
                    minWidth={490}
                    display="flex"
                    flexDirection="column"
                    borderRadius="15px"
                >
                    <Typography fontSize="18px" fontWeight={600} color="#11142d">All items info</Typography>
                    <Stack my="20px" direction="row" gap={4} alignItems="center" justifyContent="space-between">
                        <Typography fontSize="18px" fontWeight={600} color="#11142d">
                            Items created
                        </Typography>
                        <Typography fontSize={28} fontWeight={700} color="#11142d">
                            {allProperties.length}
                        </Typography>
                    </Stack>
                </Box>
            </Stack>

            <Box
                flex={1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
            >
                <Typography fontSize="18px" fontWeight={600} color="#11142d">
                    Table of Properties
                </Typography>

            </Box>
        </Box>
    );
};

export default Home;