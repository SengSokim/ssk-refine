/* eslint-disable no-restricted-globals */
import { Typography, Box, Stack } from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  PictureAsPdf
} from "@mui/icons-material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PhoneIcon from '@mui/icons-material/Phone';
import { CustomButton } from "components";
import { Grid } from '@mui/material';
import { useState } from 'react'
import 'styleinv.css'
function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { queryResult } = useShow();
  const { mutate } = useDelete();
  const { id } = useParams();
  const [discount, setDiscount] = useState(0);
  const { data, isLoading, isError } = queryResult;
  const propertyDetails = data?.data ?? {};

  function handlePrint() {
    window.print()
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const isCurrentUser = user.email === propertyDetails.creator.email;

  const handleDeleteProperty = () => {
    const response = confirm(
      "Are you sure you want to delete this property?",
    );
    if (response) {
      mutate(
        {
          resource: "properties",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/properties");
          },
        },
      );
    }
  };

  function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty: number, unit: number) {
    return qty * unit;
  }
  const TAX_RATE = 0.1;

  const subTotal = Number((propertyDetails.quantity * propertyDetails.price - discount).toFixed(2))
  const vat = Number(((propertyDetails.quantity * propertyDetails.price - discount) * 0.1)).toFixed(2)
  const gtotal = Number((Number(subTotal) + Number(vat)).toFixed(2));
  function calc(e: any) {
    (
      setDiscount(e.target.value)
    )
  }
  const rows = (propertyDetails.price * propertyDetails.quantity)
  const invoiceSubtotal = (rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  // time
  const date = propertyDetails.createdAt.split('T')[0]
  const day = date.split('-')[2]
  const month = date.split('-')[1]
  const year = date.split('-')[0]
  return (
    <Box>
      <Box
        borderRadius="15px"
        padding="20px"
        bgcolor="#FCFCFC"
        width="100%"
        sx={{
          '@media print': {
            display: 'none'
          }

        }}
      >
        <Typography fontSize={25} fontWeight={700} color="#11142D">
          Item Details
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 12 }}>
          <Grid item xs={4} sm={6} md={6}>
            <Box flex={1} maxWidth={764}>
              <img
                src={propertyDetails.photo}
                alt="property_details-img"
                height={546}
                style={{ objectFit: "cover", borderRadius: "10px" }}
                className="property_details-img"
              />
            </Box>
          </Grid>
          <Grid item xs={4} sm={6} md={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      {propertyDetails.title}
                    </TableCell>
                    <TableCell align="right" colSpan={3}>
                      {day}/{month}/{year}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Desc</TableCell>
                    <TableCell align="right">Qty.</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{propertyDetails.description}</TableCell>
                    <TableCell align="right">{propertyDetails.quantity}</TableCell>
                    <TableCell align="right">{propertyDetails.price}$</TableCell>
                    <TableCell align="right">{priceRow(propertyDetails.quantity, propertyDetails.price).toFixed(2)}$</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceSubtotal)}$</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceTaxes)}$</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Grand Total</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceTotal)}$</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Stack
              mt={2}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <img
                src={
                  checkImage(propertyDetails.creator.avatar)
                    ? propertyDetails.creator.avatar
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                alt="avatar"
                width={90}
                height={90}
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                  display: "none"
                }}
              />

              <Box mt="15px">
                <Typography
                  fontSize={18}
                  fontWeight={600}
                  color="#11142D"
                  sx={{
                    '@media print': {
                      display: 'none'
                    }

                  }}
                >
                  {propertyDetails.creator.name}
                </Typography>
              </Box>

            </Stack>

            <Stack
              width="100%"
              mt="25px"
              direction="row"
              flexWrap="wrap"
              gap={2}
              sx={{
                '@media print': {
                  display: 'none'
                }

              }}
            >
              <CustomButton
                title={!isCurrentUser ? "Message" : "Create Invoice"}
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
                icon={
                  !isCurrentUser ? <ChatBubble /> : <PictureAsPdf />
                }

                handleClick={() => {
                  if (isCurrentUser) {
                    handlePrint()
                  }
                }}
              />
              <CustomButton
                title={!isCurrentUser ? "Message" : "Edit"}
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
                icon={
                  !isCurrentUser ? <ChatBubble /> : <Edit />
                }
                handleClick={() => {
                  if (isCurrentUser) {
                    navigate(
                      `/properties/edit/${propertyDetails._id}`,
                    );
                  }
                }}
              />
              <CustomButton
                title={!isCurrentUser ? "Call" : "Delete"}
                backgroundColor={
                  !isCurrentUser ? "#2ED480" : "#d42e2e"
                }
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <Phone /> : <Delete />}
                handleClick={() => {
                  if (isCurrentUser) handleDeleteProperty();
                }}
              />
            </Stack>
          </Grid>

        </Grid>
      </Box >
      <Grid item xs={8} sm={12} md={12}>
        <Box sx={{ width: '21cm',
        height: '29.7cm', backgroundColor:'#fff', margin: '10px auto','@media print': {
          position: 'absolute', top: '0', left:'0'
        }
}}>
          <Stack direction="column" spacing={2} sx={{ textAlign: 'center' }}>
            <Typography sx={{ marginTop: "20px", fontSize: "2rem", fontWeight: '600',fontFamily:'Khmer' }}>រោងពុម្ព សេងហួរ</Typography>
            <Typography sx={{ fontSize: "1.25rem", fontWeight: '400' }}>Seng Hour Printing House</Typography>
            <Typography>ផ្ទះលេខ៤០ ផ្លូវ៧៩BT សង្កាត់បឹងទំពន់ ខណ្ឌមានជ័យ រាជធានីភ្នំពេញ</Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PhoneIcon />
              012 915 392
            </Typography>
            <hr />

            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              វិ​ក្ក​យ​បត្រអាករ <br />
              TAX INVOICE
            </Typography>
          </Stack>


          <Box sx={{ width: '100%' }}>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Typography sx={{ marginLeft: "3rem" }}>
                  <Typography>អតិថិជន / Customer</Typography>
                  <Typography sx={{
                    textAlign: 'left'
                  }}>ឈ្មោះ​ក្រុម​ហ៊ុន <br />
                    Company Name: <span style={{
                      fontWeight: "400",
                      fontSize: "1rem"
                    }} contentEditable suppressContentEditableWarning={true} /></Typography>
                  <hr style={{ border: '1px solid black' }}/>
                  <Typography sx={{
                    textAlign: 'left'
                  }}>លេខទូរស័ព្ទ<br />
                    Telephone No. :<span style={{
                      fontWeight: "400",
                      fontSize: "1rem"
                    }} contentEditable suppressContentEditableWarning={true} /></Typography>
                  <hr style={{ border: '1px solid black' }}/>
                  <Typography sx={{
                    textAlign: 'left'
                  }}>ឤស័យដ្ឋាន<br />
                    Address : <span style={{
                      fontWeight: "400",
                      fontSize: "1rem"
                    }} contentEditable suppressContentEditableWarning={true} /></Typography>
                  <hr style={{ border: '1px solid black' }}/>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ textAlign: 'right', marginRight: "3rem" }}>
                  <Typography >លេខ​វិ​ក្ក​យ​បត្រ <br />
                    Invoice No.</Typography>
                  <Typography><span contentEditable suppressContentEditableWarning={true} style={{ color: 'red' }}>SH23-0001</span></Typography>

                  <Typography >កាលបរិច្ឆេទ<br />
                    Date </Typography>
                  <Typography >{day}/{month}/{year}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <TableContainer sx={{ padding: '0 1rem' }}>
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
                  <TableCell sx={{ color: "black" }} align="left">2</TableCell>
                  <TableCell sx={{ color: "black" }} contentEditable suppressContentEditableWarning={true}></TableCell>
                  <TableCell sx={{ color: "black" }} align="right" contentEditable suppressContentEditableWarning={true}></TableCell>
                  <TableCell sx={{ color: "black" }} align="right" contentEditable suppressContentEditableWarning={true}></TableCell>
                  <TableCell sx={{ color: "black" }} align="right" contentEditable suppressContentEditableWarning={true}></TableCell>
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

        </Box>
      </Grid>
    </Box>
  );
};

export default PropertyDetails;