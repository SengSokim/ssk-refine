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
import { CustomButton } from "components";
import { Grid } from '@mui/material';
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

  const { data, isLoading, isError } = queryResult;

  const propertyDetails = data?.data ?? {};
  console.log(propertyDetails)
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

  const rows = (propertyDetails.price * propertyDetails.quantity)
  const TAX_RATE = 0.1;
  const invoiceSubtotal = (rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#FCFCFC"
      width="100%"
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
                    <TableCell align="right">{priceRow(propertyDetails.quantity,propertyDetails.price).toFixed(2)}$</TableCell>
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
                }}
              />

              <Box mt="15px">
                <Typography
                  fontSize={18}
                  fontWeight={600}
                  color="#11142D"
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
                    navigate(
                      `/properties/edit/${propertyDetails._id}`,
                    );
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
    </Box>
  );
};

export default PropertyDetails;