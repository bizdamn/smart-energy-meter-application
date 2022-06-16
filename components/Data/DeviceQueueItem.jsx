import React, {useEffect } from "react";
export default function DeviceQueueItem(props) {
    useEffect(() => {
            const requestOptions = {
              method: 'POST',
              headers: { 
                  'Grpc-Metadata-Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiZjYwMGZlNTItZTEwNi00MzNiLTllZmYtMmMyMTM0YWFlZjFmIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY1NTAyOTI5OCwic3ViIjoiYXBpX2tleSJ9.yB2Tok8PtYJwASWcjszQ0WuPk0-kScpZIUujgWsS8Ns'
              },
              body: JSON.stringify({
                      deviceQueueItem: { 
                        confirmed: true, 
                        data:`${props.commandInBas64}`, 
                        devEUI:`${props.devEUI}` ,  
                        fCnt: 0,  
                        fPort: 7
                      }  
              }),};
          fetch(`https://chirpstack.igscsi4server.com/api/devices/${props.devEUI}/queue`, requestOptions)
              .then(response => response.json())
              .then(data => console.log(data)).catch(function (error) {
                alert('Please Check your internet connection. Either their is no internet connection or the signals are weak');
              });
    }, [props.commandInBas64,props.devEUI])
    
    return (
        <>
       <p>EUI Number {props.devEUI} is given a command of {props.CommandName}</p>
        </>
        );}
    
