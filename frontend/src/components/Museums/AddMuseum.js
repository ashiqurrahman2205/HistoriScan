import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Box, Button, Dialog, FormLabel, TextField, Typography ,FormControlLabel,RadioGroup,Radio} from '@mui/material'
import { addMuseum } from '../../api-helpers/api-helpers';
const labelProps = {
  mt:1,
  mb:1,
}
const AddMuseum = () => {
  const navigate = useNavigate();
  const [inputs,setInputs] = useState({
    name:"",
    description:"",
    posterUrl:"",
    location:"",
    price:null,
    site:"",
   });
   const [successMessage, setSuccessMessage] = useState('');
    const handleSubmit = (e) => {
         e.preventDefault();
         console.log(inputs);
         addMuseum({...inputs}).then((res) => {console.log(res);
          if(inputs.site === 'Heritage_Site'){
            setSuccessMessage("Added Sucessfuly")
            setTimeout(() => {
              navigate('/Heritage_Site');
            },1500);
          }
          else if(inputs.site === 'Museum'){
            setSuccessMessage("Added Sucessfuly")
            setTimeout(() => {
              navigate('/Museum');
            },1500);
          }
         

         })
         .catch((err)=> console.log(err))
        //  window.location.reload();
    }
   const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]:e.target.value,
    }));
   };
   
  return (
     
    <div>
        <form onSubmit={handleSubmit}>
            <Box width={{xs:'90%',md:'50%'}} paddingY={10} paddingX={2} margin={"auto"} 
            display={'flex'} flexDirection={'column'} textAlign={"left"} boxShadow={"10px 10px 20px #ccc"}>
                <Typography textAlign={'center'} variant='h5' fontFamily={'verdana'}>
                     Add New Museum/ Heritage Site
                </Typography>
                <FormLabel sx={labelProps}> Name</FormLabel>
                <TextField value={inputs.name} onChange={handleChange} name='name' variant='standard' margin='normal' required="true"></TextField>
                <FormLabel sx={labelProps}>Description</FormLabel>
                <TextField value={inputs.description} onChange={handleChange} name='description' variant='standard' margin='normal'  multiline rows={2}  required="true"></TextField>  
                <FormLabel sx={labelProps}>posterUrl</FormLabel>
                <TextField value={inputs.posterUrl} onChange={handleChange} name='posterUrl' variant='standard' margin='normal' required="true"></TextField>
                <FormLabel sx={labelProps}>Location</FormLabel>
                <TextField value={inputs.location} onChange={handleChange} name='location' variant='standard' margin='normal' required="true"></TextField>
                <FormLabel sx={labelProps}>Ticket Price</FormLabel>
                <TextField value={inputs.price} onChange={handleChange} name='price' variant='standard' margin='normal' required="true"></TextField>
                <FormLabel sx={labelProps}>Museum / Heritage Site</FormLabel>
                <RadioGroup
          value={inputs.site}
          onChange={handleChange}
          name='site'
          required="true"
        >
          <FormControlLabel
            value='Museum'
            control={<Radio />}
            label='Museum'
          />
          <FormControlLabel
            value='Heritage_Site'
            control={<Radio />}
            label='Heritage Site'
          />
        </RadioGroup>

                <Button width={"30%"} margin={"auto"} variant='contained' sx={{width:"30",bgcolor:"#2b2d42", ":hover":{bgcolor:"#121217"}}} type='submit'>
                 Add</Button>
                  {successMessage && (
            <Dialog   PaperProps={{ style: {borderRadius:20, maxWidth: 'md', width: '80%', maxHeight: '10vh', backgroundColor:"#2b2d42", color:"white", height: '10vh', textAlign:"center", justifyContent:"center"} }}  open={true}>
              {successMessage}
            </Dialog>
          )}
            </Box>
        </form>
    </div>
  )
}

export default AddMuseum
