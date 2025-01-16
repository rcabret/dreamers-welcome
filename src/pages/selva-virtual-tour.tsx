
import React,{useEffect} from 'react';
import Head from 'next/head';
import { Content } from '../styles/global';
import { StyledButton } from '../_components/PropertyGridItem/styles';




const VirtualTour = ({setNavTheme}:any) => {


  useEffect(() => {
    setNavTheme('dark')
}, [])


  return (
    <>
<Head>
        <title>Selva by DW Virtual Tour</title>
        <meta 
          name="description" 
          content="Take a virtual tour of Selva by DW, a luxury vacation rental in Luquillo, Puerto Rico. Experience luquillo resorts, Puerto Rico rainforest hotels, and a relaxing bath house in Puerto Rico." 
        />
        <meta 
          name="keywords" 
          content="luquillo resorts, puerto rico rainforest hotels, puerto rico bath house, bath house in puerto rico, san juan bathhouse, rainforest spa puerto rico, el hotelito rainforest puerto rico" 
        />
        <meta property="og:title" content="Selva by DW Virtual Tour" />
        <meta 
          property="og:description" 
          content="Experience Selva by DW in virtual reality. Explore luquillo resorts, rainforest spa Puerto Rico, and El Hotelito rainforest Puerto Rico in this virtual tour." 
        />
      </Head>
      <Content padding>
      <div className="virtual-tour-container">    
  
        <div className="captur3d-3d-tour">
          <iframe
            width="920"
            height="540"
            src="https://mattertraffic.com/E5m3bJYCQKz"
            allowFullScreen
            mozAllowFullScreen="true"
            webkitAllowFullScreen="true"
            allow="xr-spatial-tracking; clipboard-write"
          ></iframe>
        </div>
      </div>
</Content>

    </>
  );
};

export default VirtualTour;





