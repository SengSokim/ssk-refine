
import { Link } from "@pankod/refine-react-router-v6";
import {
    Typography,
    Box,
    Card,
    CardMedia,
    CardContent,
    Stack,
} from "@pankod/refine-mui";

import { PropertyCardProps } from "interfaces/property";
import { Grid } from '@mui/material';
const PropertyCard = ({
    id,
    title,
    quantity,
    price,
    photo,
    description
}: PropertyCardProps) => {

    return (
        <Grid item xs={4} sm={4} md={3}>
            <Card sx={{ mt: "5px",padding: "10px", height: '100%' }}>
                <Card
                    component={Link}
                    to={`/properties/show/${id}`}
                    sx={{
                        padding: "10px",
                        cursor: "pointer",
                    }}
                >
                    <CardMedia
                        component="img"
                        width="100%"
                        height={210}
                        image={photo}
                        alt="card image"
                        sx={{ borderRadius: "10px" }}
                    />
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "10px",
                            paddingX: "5px",
                        }}
                    >
                        <Stack direction="column" gap={1}>
                            <Typography fontSize={16} fontWeight={500} color="#11142d">
                                {title}
                            </Typography>
                            <Stack direction="row" gap={0.5} alignItems="flex-start">
                                <Typography fontSize={14} color="#808191">
                                    {description.length > 40 ? (description.substr(0, 40)) + "..." : description}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Box
                            px={1.5}
                            py={0.5}
                            borderRadius={1}

                            height="fit-content"
                        >
                            <Typography fontSize={16} fontWeight={600}>
                                Total
                            </Typography>
                            <Typography fontSize={14} fontWeight={600} color="#475be8">
                                ${price}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Card>

        </Grid>

    );
};

export default PropertyCard;