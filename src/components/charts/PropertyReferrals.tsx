import ReactApexChart from 'react-apexcharts';
import {Typography, Box, Stack} from '@pankod/refine-mui';
import { propertyReferralsInfo } from 'constants/index';

interface ProgressBarProps {
  id: number;
  title: string;
  percentage: number;
  color: string;
}

const ProgressBar = ({id, title, percentage, color} : ProgressBarProps) => (
  <Box width="100%">
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between">
      <Typography fontSize={16} fontWeight={500} color="#11142d">{title}</Typography>
      <Typography fontSize={16} fontWeight={500} color="#11142d">{percentage} %</Typography>
    </Stack>
    <Box 
      width="100%"
      height="10px"
      position="relative" 
      borderRadius="10px"
      mt={2}
      bgcolor="#e4e8ef">
        <Box
        width={`${percentage}%`}
        bgcolor={color}
        position="absolute"
        height="100%"
        borderRadius={1}/>
    </Box>
  </Box>
)

const PropertyReferrals = () => {
  return (
    <Box
    p={4}
    bgcolor="#fcfcfc"
    id="chart"
    minWidth={490}
    display="flex"
    flexDirection="column"
    borderRadius="15px">
      <Typography
      fontSize={18}
      fontWeight={600}
      color="#11142d"
      >Réferences des propriétés
      </Typography>
      <Stack
      my="20px"
      direction="column"
      gap={4}
      >
        {propertyReferralsInfo.map((bar) => 
        <ProgressBar key={bar.id} {...bar}/>)}
      </Stack>
      
    </Box>
  )
}

export default PropertyReferrals