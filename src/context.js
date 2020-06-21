import React,{useState, useEffect} from 'react'

export const Context = React.createContext()

export function Provider(props) {
    const [trackList,setTrackList] = useState([])
    const [heading,setHeading] = useState('Top 10 Tracks')

    useEffect(() => {
        const cors = `https://cors-anywhere.herokuapp.com/`
        fetch(`${cors}http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=in&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res=>res.json())
            .then(r=>{setTrackList(r.message.body.track_list)})
            .catch(e=>console.log(e))
    }, [])

    return (
        <Context.Provider value={{
            trackList,
            setTrackList,
            setHeading,
            heading
        }}>
            {props.children}
        </Context.Provider>
    )
}