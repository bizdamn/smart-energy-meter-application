import React, { useState, useEffect } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
var _ = require("lodash");
export default function Devices() {
  const [Devices, setDevices] = useState({
    totalCount: null,
    result: null,
  });

  useEffect(() => {
    // POST request using fetch with set headers
    const requestOptions = {
      method: "GET",
      headers: {
        "Grpc-Metadata-Authorization":
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiZjYwMGZlNTItZTEwNi00MzNiLTllZmYtMmMyMTM0YWFlZjFmIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY1NTAyOTI5OCwic3ViIjoiYXBpX2tleSJ9.yB2Tok8PtYJwASWcjszQ0WuPk0-kScpZIUujgWsS8Ns",
      },
    };
    fetch(
      `https://chirpstack.igscsi4server.com/api/devices?limit=100000&applicationID=${process.env.NEXT_PUBLIC_CHIRPSTACK_APPLICATION_ID}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) =>
        setDevices({ result: data.result, totalCount: data.totalCount }),
      ).catch(function (error) {
        alert('Please Check your internet connection. Either their is no internet connection or the signals are weak');
      });
  }, []);

  var array = _.toArray(Devices.result);



  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ overflowX: 'scroll' }}
      >
        <table className="table table-striped  table-hover">
          <thead style={{ backgroundColor: '#38B6FF', fontSize: '1.3rem', color: '#fff' }}>
            <tr>
              <th>Device EUI Number</th>
              <th>Device Name</th>
              <th>Last Seen At</th>
            </tr>
          </thead>
          <tbody>
            {array.map((element) => {
              if (element.lastSeenAt !== null) {
                var date = new Date(element.lastSeenAt);
                var formattted_last_seen = date.toLocaleString()
              }
              else if (element.lastSeenAt === null) {
                formattted_last_seen = 'Never Seen';
              }
              return (
                <>
                  {element.name.substring(0, 3) == '1p_' ? (<>
                    <tr key={element.devEUI}>
                      <td>
                        <Link href={`/device-info/one-phase/${element.devEUI}`} style={{ color: 'black' }}><a>
                          {element.devEUI}
                        </a></Link>
                      </td>
                      <td>
                        <Link href={`/device-info/one-phase/${element.devEUI}`} style={{ color: 'black' }}><a>
                          {element.name}
                        </a></Link>
                      </td>
                      <td>
                        <Link href={`/device-info/one-phase/${element.devEUI}`} style={{ color: 'black' }}><a>
                          {formattted_last_seen}
                        </a></Link>
                      </td>

                    </tr>
                  </>) : null}
                  {element.name.substring(0, 3) == '3p_' ? (<>
                    <tr key={element.devEUI}>
                      <td>
                        <Link href={`/device-info/three-phase/${element.devEUI}`} style={{ color: 'black' }}><a>
                          {element.devEUI}
                        </a></Link>
                      </td>
                      <td>
                        <Link href={`/device-info/three-phase/${element.devEUI}`} style={{ color: 'black' }}><a>
                          {element.name}
                        </a></Link>
                      </td>
                      <td>
                        <Link href={`/device-info/three-phase/${element.devEUI}`} style={{ color: 'black' }}><a>
                          {formattted_last_seen}
                        </a></Link>
                      </td>

                    </tr>
                  </>) : null}
                  {element.name.substring(0, 3) == 'th_' ? (<>
                    <tr key={element.devEUI}>
                      <td>
                        <Link href={`/device-info/temp-hum/${element.devEUI}`} style={{ color: 'black' }}><a>
                          {element.devEUI}
                        </a></Link>
                      </td>
                      <td>
                        <Link href={`/device-info/temp-hum/${element.devEUI}`} style={{ color: 'black' }}><a>
                          {element.name}
                        </a></Link>
                      </td>
                      <td>
                        <Link href={`/device-info/temp-hum/${element.devEUI}`} style={{ color: 'black' }}><a>
                          {formattted_last_seen}
                        </a></Link>
                      </td>

                    </tr>
                  </>) : null}

                </>
              );
            })}

          </tbody>
        </table>

      </Grid>

    </>
  );
}
