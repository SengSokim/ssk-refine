import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography, Stack } from "@pankod/refine-mui";
import PhoneIcon from '@mui/icons-material/Phone';
import { useShow } from "@pankod/refine-core";
import { useState } from 'react'
import { useList } from "@pankod/refine-core";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            page: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
function Invoice() {
    const { queryResult } = useShow();
    const [discount, setDiscount] = useState(0);
    const { data } = queryResult;
    const TAX_RATE = 0.1;
    const propertyDetails = data?.data ?? {};
    const subTotal = Number((propertyDetails.quantity * propertyDetails.price - discount).toFixed(2))
    const vat = Number(((propertyDetails.quantity * propertyDetails.price - discount) * 0.1)).toFixed(2)
    const gtotal = Number((Number(subTotal) + Number(vat)).toFixed(2));
    function calc(e: any) {
        (
            setDiscount(e.target.value)
        )
    }
    console.log(data)

    return (
        <page>
            <Stack direction="column" spacing={2} sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: "2rem", fontWeight: '500' }}>រោងពុម្ព សេងហួរ</Typography>
                <Typography sx={{ fontSize: "1.25rem", fontWeight: '400' }}>Seng Hour Printing House</Typography>
                <Typography>ផ្ទះលេខ៤០ ផ្លូវ៧៩BT សង្កាត់បឹងទំពន់ ខណ្ឌមានជ័យ រាជធានីភ្នំពេញ</Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PhoneIcon />
                    012 915 392
                </Typography>
                <hr />

                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    វិ​ក័​យ​ប័ត្រអាករ <br />
                    TAX INVOICE
                </Typography>
            </Stack>


            <Box sx={{ width: '100%' }}>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid xs={6}>
                        <Typography sx={{ marginLeft: "3rem" }}>
                            <Typography>អតិថិជន / Customer</Typography>
                            <Typography sx={{ textAlign: 'left' }}>ឈ្មោះ​ក្រុម​ហ៊ុន <br />
                                Company Name: <span contentEditable /></Typography>
                            <hr />
                            <Typography sx={{ textAlign: 'left' }}>លេខទូរស័ព្ទ<br />
                                Telephone No. :<span contentEditable /></Typography>
                            <hr />
                            <Typography sx={{ textAlign: 'left' }}>អាសយដ្ឋាន<br />
                                Address : <span contentEditable /></Typography>
                            <hr />
                        </Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Typography sx={{ textAlign: 'right', marginRight: "3rem" }}>
                            <Typography >លេខ​វិ​ក័​យ​ប័ត្រ <br />
                                Invoice No.</Typography>
                            <Typography><span contentEditable style={{ color: 'red' }}>SH23-0001</span></Typography>

                            <Typography >កាលបរិច្ឆេទ<br />
                                Date </Typography>
                            <Typography >21/02/2023
                            </Typography>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <TableContainer component={Paper} sx={{ padding: '0 1rem' }}>

                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "black" }}>
                            <TableCell sx={{ color: "white" }}>ល.រ <br />
                                No.</TableCell>
                            <TableCell sx={{ color: "white" }}>បរិយាយឈ្មោះទំនិញ<br />
                                Item Description</TableCell>
                            <TableCell sx={{ color: "white" }} align="right">បរិមាណ<br />
                                Quantity</TableCell>
                            <TableCell sx={{ color: "white" }} align="right">តម្លៃ​ឯកតា<br />
                                Unit Price</TableCell>
                            <TableCell sx={{ color: "white" }} align="right">ថ្លៃសរុប<br />
                                Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{
                        backgroundColor: "white", "& td": {

                            border: "1px solid black"
                        }
                    }}>

                        <TableRow key={propertyDetails._id}>
                            <TableCell sx={{ color: "black" }} align="left">1</TableCell>
                            <TableCell sx={{ color: "black" }}>{propertyDetails.title}</TableCell>
                            <TableCell sx={{ color: "black" }} align="right">{propertyDetails.quantity}</TableCell>
                            <TableCell sx={{ color: "black" }} align="right">{propertyDetails.price}$</TableCell>
                            <TableCell sx={{ color: "black" }} align="right">{(propertyDetails.quantity * propertyDetails.price).toFixed(2)}$</TableCell>

                        </TableRow>

                        <TableRow>
                            <TableCell component="th" rowSpan={6} sx={{ border: "none" }} />
                            <TableCell component="th" rowSpan={6} sx={{ border: "none" }} />
                            <TableCell sx={{ color: "black" }} colSpan={2}>Discount</TableCell>
                            <TableCell sx={{ color: "black", width: '30%' }} align="right">
                                <input dir="rtl" type="text" value={discount} onChange={calc} style={{ border: 'none', width: '25%', fontWeight: "400", fontSize: "0.875rem" }} />$
                            </TableCell>
                        </TableRow>
                        <TableRow>

                            <TableCell sx={{ color: "black" }} colSpan={2}>Subtotal</TableCell>
                            <TableCell sx={{ color: "black" }} align="right">{subTotal.toLocaleString()}$</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell sx={{ color: "black" }}>VAT</TableCell>
                            <TableCell sx={{ color: "black" }} align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                            <TableCell sx={{ color: "black" }} align="right">{vat}$</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ color: "black" }} colSpan={2}>Grand Total</TableCell>
                            <TableCell sx={{ color: "black" }} align="right">{gtotal.toLocaleString()}$</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ color: "black" }} colSpan={2}>Exchange Rate</TableCell>
                            <TableCell sx={{ color: "black" }} align="right">4118៛</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ color: "black" }} colSpan={2}>Grand Total in riels</TableCell>
                            <TableCell sx={{ color: "black" }} align="right">{Number(((Number(gtotal) * 4118).toFixed(2))).toLocaleString()}៛</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

        </page>
    )
}

export default Invoice