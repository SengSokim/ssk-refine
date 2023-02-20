import { useList } from "@pankod/refine-core";
import ReactApexChart from 'react-apexcharts'
import { Typography, Box, Stack } from '@pankod/refine-mui'
import { ArrowCircleUpRounded } from '@mui/icons-material'
import { Table } from '@mui/material';
import { TotalRevenueOptions, TotalRevenueSeries } from '../components/charts/chart.config'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useState} from 'react';
const Home = () => {
    
    const { data, isLoading, isError } = useList({
        resource: "properties",

    });
    
    const allProperties = data?.data ?? [];
    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Something went wrong!</Typography>;
    console.log(allProperties)
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
                            ${allProperties.reduce((sum,property) => sum = sum + property.price, 0).toLocaleString()}
                        </Typography>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <ArrowCircleUpRounded sx={{ fontSize: 25, color: '#475be8' }} />
                            <Stack>
                                <Typography fontSize={15} color="#475be8">0.9%</Typography>
                                <Typography fontSize={12} color="#808191">Than Last Month</Typography>
                            </Stack>

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
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Properties Name</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {allProperties.map((property) => (
                                <TableRow
                                    key={property._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {property.title}
                                    </TableCell>
                                    <TableCell align="left">{property.description.length > 40 ? (property.description.substr(0, 40)) + "..." : property.description}</TableCell>
                                    <TableCell align="right">{property.quantity}</TableCell>
                                    <TableCell align="right">{property.price.toLocaleString()}$</TableCell>
                                    <TableCell align="right">total</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </Box>
    );
};

export default Home;