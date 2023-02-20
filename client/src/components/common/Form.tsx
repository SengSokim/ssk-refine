import { Box, Typography, FormControl, FormHelperText, TextField, TextareaAutosize, Stack, Select, MenuItem, Button, borderRadius }
  from '@pankod/refine-mui'

import { FormProps } from 'interfaces/common';
import CustomButton from './CustomButton'

const Form = ({ type, register, handleSubmit, handleImageChange, formLoading, onFinishHandler, propertyImage }: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} an item
      </Typography>
      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
        <form style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}>Enter item name</FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              placeholder='Item name'
              color="info"
              variant="outlined"
              {...register('title', { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}>Enter Description</FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder="Write Description"
              color="info"
              style={{
                width: '100%',
                background: 'transparent',
                fontSize: '16px',
                fontWeight: 500,
                borderColor: 'rgba(0,0,0,0.23)',
                borderRadius: 6,
                padding: 10,
                color: '#919191'
              }}
              {...register('description', { required: true })}
            />
          </FormControl>
          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142d'
              }}>
                Select Item Type
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue="book"
                {...register('propertyType', { required: true })}
              >
                <MenuItem value="book">Book</MenuItem>
                <MenuItem value="leaflet">Leaflet</MenuItem>
                <MenuItem value="brochure">Brochure</MenuItem>
                <MenuItem value="flyer">Flyer</MenuItem>
                <MenuItem value="voucher">Voucher</MenuItem>
                <MenuItem value="namecard">Namecard</MenuItem>
                <MenuItem value="calendar">Calendar</MenuItem>
                <MenuItem value="menubook">Menu book"</MenuItem>
              </Select>
            </FormControl>

          </Stack>
          <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}>
              Enter Quantity
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"

              variant='outlined'
              {...register('quantity', { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}>
              Enter item price
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              type="text"
              variant='outlined'
              {...register('price', { required: true })}
            />
          </FormControl>
          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography color="#11142d" fontSize={16} fontWeight={500} my="10px">
                Item Photos
              </Typography>
              <Button component="label" sx={{
                width: 'fit-content',
                color: '#2ed480', textTransform: 'capitalize', fontSize: 16
              }}>
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    // @ts-ignore
                    handleImageChange(e.target.files[0])
                  }}
                />
              </Button>
            </Stack>
            <Typography fontSize={14} color="#8018191" sx={{ wordBreak: 'break-all' }}>
              {propertyImage?.name}
            </Typography>
          </Stack>

          <CustomButton
            type="submit"
            title={formLoading ? "Submitting..." : "Submit"}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>

  )
}

export default Form