import { Typography, Box, Stack } from '@pankod/refine-mui';

import { useDelete, useGetIdentity, useShow } from '@pankod/refine-core';
import {useParams, useNavigate } from '@pankod/refine-react-router-v6';
import {ChatBubble, Delete, Phone, Place, Edit, Star, Book} from '@mui/icons-material' ;
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { CustomButton } from 'components';

const PropertyDetails = () => {

  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();

  const { data, isLoading, isError } = queryResult;

  const propertyDetails = data?.data ?? {};
  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography>Un erreur est survenue...</Typography>  

  const isCurrentUser = user.email === propertyDetails.creator.email;

  const handleDeleteProperty = () => {
    const response = window.confirm('Vous êtes sûr de vouloir supprimer cette propriété ?');
    if (response) {
      mutate({
        resource: 'properties',
        id: id as string,
      }, {
        onSuccess: () => {
          navigate('/properties');
        }
      });
    }
  };
  
  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#fcfcfc"
      width="fit-content"
      >
        
        <Typography 
        fontSize={25} 
        fontWeight={700} 
        color="#11142d">Details</Typography>

       <Box mt="20px" display="flex" flexDirection={{ xs: 'column', lg: 'row'}} gap={4}>

          <Box flex={1} maxWidth={764}>
            <img 
              src={propertyDetails.photo}
              alt={propertyDetails.title}
              height={546}
              style= {{ objectFit: "cover", borderRadius: '10px' }}
              className="property_details-img"
              />

          <Box mt="15px">
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center">
                <Typography fontSize={18} fontWeight={500} color="#11142d" textTransform='capitalize'>{propertyDetails.propertyType}</Typography>
                <Box>
                  {[1, 2, 3, 4, 5].map((star) => 
                  <Star key={`star-${star}`} sx={{ color:"#f2c94c" }}/>
                )}
                </Box>
              </Stack>

              <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center"
                gap={2}>
                  <Box>
                    <Typography fontSize={22} fontWeight={600} mt="10px" color="#11142d">{propertyDetails.title}</Typography>
                    <Stack mt={0.5} direction="row" alignItems='center' gap={0.5}>
                      <Place sx={{ color:"#808191" }}/>
                      <Typography fontSize={14} color="#808191">{propertyDetails.location}</Typography>
                    </Stack>
                  </Box>

                    <Box>
                      <Typography fontSize={16} fontWeight={600} mt="10px" color="#11142D">Prix</Typography>
                      <Stack direction="row" alignItems="flex-end" gap={1}>
                        <Typography fontSize={25} fontWeight={700} color="#475BE8">{propertyDetails.price} €</Typography>
                        <Typography fontSize={14} color="#808191" ml={1} mt={1}>/mois</Typography>
                      </Stack>
                    </Box>                  
                </Stack>
                
                  <Stack mt="25px" direction="column" gap="10px">
                    <Typography fontSize={18} color="#11142d" textTransform='capitalize'>Description</Typography>  
                    <Typography fontSize={14} color="#808191">{propertyDetails.description}</Typography>
                    <ExpandMoreIcon />                  
                  </Stack>
                </Box>
              </Box>

              <Box flex={1} maxWidth={{xs: '100%', md: 326}} display="flex" flexDirection="column" gap="20px">
              <Stack
                width="100%"
                p={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
                border="1px solid #E4E4E4"
                borderRadius={2}
                >

                  <Stack mt={2} justifyContent="center" alignItems="center" textAlign="center">
                    <img
                    src={propertyDetails.creator.avatar}
                    alt={propertyDetails.creator.name}
                    width={90}
                    height={90}
                    style={{ borderRadius: '100%', objectFit: 'cover'}}
                    />

                    <Box mt="15px">
                      <Typography fontSize={18} fontWeight={600} color="#11142d" textTransform='capitalize'>{propertyDetails.creator.name}</Typography>
                      <Typography mt="5px" fontSize={14} fontWeight={400} color="#808191">Agent</Typography>
                    </Box>

                    <Stack mt="15px" direction="row" alignItems='center' gap={1}>
                      <Place sx={{ color:"#808191" }}/>
                      <Typography fontSize={14} fontWeight={400} color="#808191">{propertyDetails.creator.location}</Typography>
                    </Stack>

                    <Typography mt={1} fontSize={16} fontWeight={600} color="#11142d">{propertyDetails.creator.allProperties.length} Properties </Typography>
                  </Stack>

                  <Stack width="100%" mt="25px" direction="row" flexWrap="wrap" gap={2}>
                    <CustomButton
                      title={!isCurrentUser ? 'Message' : 'Edit'}
                      backgroundColor="#475BE8"
                      color="#fcfcfc"
                      fullWidth
                      icon={!isCurrentUser ? <ChatBubble sx={{ color:"#fff" }}/> : <Edit sx={{ color:"#fff" }}/>}
                      handleClick={() => {
                        if (isCurrentUser) {
                          navigate(`/properties/edit/${propertyDetails._id}`);
                        }                        
                      }}                      
                    />
                    <CustomButton
                      title={!isCurrentUser ? 'Call' : 'Delete'}
                      backgroundColor={!isCurrentUser ? '#2ED480' : '#d42e2e'}
                      color="#FCFCFC"
                      fullWidth
                      icon={!isCurrentUser ? <Phone /> : <Delete />}
                      handleClick={() => {
                        if(!isCurrentUser) handleDeleteProperty();
                      }}
                    />
                  </Stack>
                </Stack>

                  <Stack>
                    <img
                    src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
                    alt="map"
                    width="100%"
                    height={306}
                    style={{ borderRadius: 10, objectFit: 'cover'}}
                    />
                  </Stack>

                <Box>
                  <CustomButton
                    title="Book Now"
                    backgroundColor="#475BE8"
                    color="#fcfcfc"
                    fullWidth
                    icon={<Book sx={{ color:"#fff" }}/>}
                    handleClick={() => {
                      navigate(`/properties/book/${propertyDetails._id}`);
                    }}
                  />                 
                </Box>
            </Box>
          </Box>
        </Box>
    
  )
};

export default PropertyDetails