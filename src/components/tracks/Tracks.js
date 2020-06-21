// import React,{useContext} from 'react'
// import { Context } from '../../context'
// import Spinner from "../layout/Spinner"
// import Track from "../tracks/Track"

// export const Tracks = () => {
//     const [state] = useContext(Context)
//     const { trackList, heading } = state

//     if (trackList === undefined || trackList.length === 0) {
//         console.log(trackList)
//         return <Spinner />;
//     } else {
//         return (
//         <>
//             {/* <h3 className="text-center mb-4">{heading}</h3>
//             <div className="row">
//             {trackList.map(item => (
//                 <Track key={item.track.track_id} track={item.track} />
//             ))}
//             </div> */}
//             <h1>tracks loaded</h1>
//         </>
//         );
//     }
//     }
import React, { useContext } from "react";
import { Context } from "../../context";
import Spinner from "../layout/Spinner";
import Track from './Track'

const Tracks = () => {
  const { trackList, heading } = useContext(Context);
  //const { track_list, heading } = state;

  if (trackList === undefined || trackList.length === 0) {
    return <Spinner />;
  } else {
    return (
      <>
        <h3 className="text-center mb-4">{heading}</h3>
        <div className="row">
          {trackList.map(item => (
            <Track key={item.track.track_id} track={item.track} />
          ))}
        </div>
      </>
    );
  }
};

export default Tracks;
