import * as React from 'react';
import { ChakraProvider } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"

export default function ButtonSaveProgress({text,  buttonProgressLoading ,size}) {


  return (
    <>
    {buttonProgressLoading?(
      <ChakraProvider>
      <Button type='submit' isLoading loadingText='Submitting' style={{ width: '100%', backgroundColor: '#0B70B6', color: 'white' }} size={size}>
        {text}
      </Button>
    </ChakraProvider>
    ):(
      <ChakraProvider>
      <Button type='submit' style={{ width: '100%', backgroundColor: '#0B70B6', color: 'white' }} size={size}>
        {text}
      </Button>
    </ChakraProvider>
    )}

   
      {/* {buttonProgressLoading && (
        <CircularProgress
          size={24}
          sx={{
            color: '#0B70B6',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )} */}
    </>
  );
}
