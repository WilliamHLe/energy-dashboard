import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

import { Grid, GridItem } from '@chakra-ui/react';
import Sankey from '../graphs/Sankey';
import CategoryUsage from '../graphs/CategoryUsage';

function Main() {
  return (
    <div>
      <div style={{ paddingLeft: '20px' }}>
        Trondheim kommune
      </div>
      <Grid
        h="90vh"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(12, 1fr)"
        padding={20}
        gap={20}
      >
        <GridItem colSpan={6} bg="papayawhip" />
        <GridItem colSpan={3} bg="papayawhip" />
        <GridItem colSpan={3} bg="papayawhip" />
        <GridItem colSpan={6} bg="tomato">
          <CategoryUsage />
        </GridItem>
        <GridItem colSpan={6} bg="tomato">
          <Sankey />
        </GridItem>
      </Grid>
    </div>
  );
}

export default Main;
