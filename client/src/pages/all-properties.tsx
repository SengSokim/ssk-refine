
import { Add } from '@mui/icons-material'
import { useTable } from '@pankod/refine-core'
import { Box, Stack, Typography, TextField, Select, MenuItem, Card } from '@pankod/refine-mui'
import { useNavigate } from '@pankod/refine-react-router-v6'
import { useMemo } from "react";
import { CustomButton } from 'components'
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from "@pankod/refine-react-router-v6";


const AllProperties = () => {
  const navigate = useNavigate();

  const { tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter, setSorter,
    filters, setFilters

  } = useTable();
  const allProperties = data?.data ?? [];
  const currentPrice = sorter.find((item) => item.field === 'price')?.order;
  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc' }])
  }

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? item : [],
    );

    return {
      title:
        logicalFilters.find((item) => item.field === "title")?.value ||
        "",
      propertyType:
        logicalFilters.find((item) => item.field === "propertyType")
          ?.value || "",
    };
  }, [filters]);
  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography>Error...</Typography>
  return (

    <Box>
      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!allProperties.length ? 'There are no items' : 'All Items'}
          </Typography>

          <Box mb={2} mt={3} display="flex" width="84%" justifyContent="space-between" flexWrap="wrap">
            <Box display="flex" gap={2} flexWrap="wrap" mb={{ xs: '20px', sm: 0 }}>
              <CustomButton
                title={`Sort price ${currentPrice === 'asc' ? '↑' : '↓'}`}
                handleClick={() => toggleSort('price')}
                backgroundColor="#475be8"
                color="#fcfcfc"
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by title"
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: "title",
                      operator: "contains",
                      value: e.currentTarget.value
                        ? e.currentTarget.value
                        : undefined,
                    },
                  ]);
                }}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
                value={currentFilterValues.propertyType}
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: "propertyType",
                        operator: "eq",
                        value: e.target.value,
                      },
                    ],
                    "replace",
                  );
                }}
              >
                <MenuItem value="">All</MenuItem>
                {[
                  "Leaflet",
                  "Brochure",
                  "Book",
                  "Flyer",
                  "Voucher",
                  "Namecard",
                  "Calendar",
                  "Menu book",
                ].map((type) => (
                  <MenuItem
                    key={type}
                    value={type.toLowerCase()}
                  >
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Box>

          </Box>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">

        <CustomButton title="Add Item" handleClick={() => navigate('/properties/create')} backgroundColor="#475be8" color="#fcfcfc" icon={<Add />}></CustomButton>
      </Stack>
      <Card sx={{ mt:"20px" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Item Type</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>

              {allProperties.map((property) => (
                <TableRow
                  key={property._id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': {
                      backgroundColor: "#d9d8d7",
                    }
                  }}
                  component={Link}
                  to={`/properties/show/${property._id}`}
                >
                  <TableCell component="th" scope="row">
                    {property.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {property.propertyType.toUpperCase()}
                  </TableCell>
                  <TableCell align="left">{property.description.length > 40 ? (property.description.substr(0, 40)) + "..." : property.description}</TableCell>
                  <TableCell align="right">{property.quantity}</TableCell>
                  <TableCell align="right">{property.price.toLocaleString()}$</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {allProperties.length > 0 && (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap">
          <CustomButton
            title="Previous"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={!(current > 1)}
          />
          <Box display={{ xs: 'hidden', sm: 'flex' }} alignItems="center" gap="5px">
            Page{''}<strong>{current} of {pageCount}</strong>
          </Box>
          <CustomButton
            title="Next"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount}
          />
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue={10}
            onChange={(e) => { setPageSize(e.target.value ? Number(e.target.value) : 10); }}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <MenuItem key={size} value={size}>Show {size}</MenuItem>
            ))}

          </Select>
        </Box>
      )}
    </Box>
  )
}

export default AllProperties