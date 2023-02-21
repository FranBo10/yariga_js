import React from 'react'
import { useList } from '@pankod/refine-core';
import {PieChart, PropertyReferrals, TotalRevenue, PropertyCard, TopAgent} from 'components';
import {Typography, Box, Stack} from '@pankod/refine-mui';

const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Dashboard
      </Typography>
      <Box mt='20px' display='flex' flexWrap = "wrap" gap={4}>
        <PieChart
        title='Proprétés à vendre'
        value={644}
        series={[75, 25]}
        colors={['#475be8', '#e4b8ef']}
        />
        <PieChart
        title='Proprétés à louer'
        value={550}
        series={[60, 40]}
        colors={['#475be8', '#e4b8ef']}
        />
        <PieChart
        title='Total clients'
        value={5684}
        series={[75, 25]}
        colors={['#475be8', '#e4b8ef']}
        />
        <PieChart
        title='Villes totales'
        value={555}
        series={[75, 25]}
        colors={['#475be8', '#e4b8ef']}
        />
      </Box>

      <Stack mt="25px" width="100%" direction = {{xs:'column', lg: 'row'}} gap={4}>
        <TotalRevenue />
        <PropertyReferrals />

      </Stack>
    </Box>
  )
}

export default Home