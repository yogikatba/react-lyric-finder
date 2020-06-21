import React,{useState, useEffect} from 'react'

export const Context = React.createContext()

export function Provider(props) {
    const [trackList,setTrackList] = useState()
    const [heading,setHeading] = useState('Top 10 Tracks')

    useEffect(() => {
        const cors = `https://cors-anywhere.herokuapp.com/`
        fetch(`${cors}http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res=>res.json())
            .then(r=>{
                //console.log(r.message.body.track_list)
                setTrackList(r.message.body.track_list)
                //console.log(trackList)
                })
            .catch(e=>console.log(e))

    //         fetch(
    //             `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
    //               process.env.REACT_APP_MM_KEY
    //             }`
    //           )
    //           .then(r=>r.json())
    //           .then(r => {
    //             console.log(r.message.body.track_list);
    //             setTrackList(r.message.body.track_list);
    //             console.log(trackList)
    //           })
    //           .catch(e => console.log(e));
    }, [])

    return (
        <Context.Provider value={{
            trackList,
            heading
        }}>
            {props.children}
        </Context.Provider>
    )
}