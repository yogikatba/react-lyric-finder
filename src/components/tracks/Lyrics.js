import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";

const Lyrics = props => {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});

  useEffect(() => {
    fetch(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => res.json())
      .then(res => {
        let lyrics = res.message.body.lyrics;
        setLyrics({ lyrics });

        return fetch(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
            props.match.params.id
          }&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => res.json())
      .then(res => {
        let track = res.message.body.track;
        setTrack({ track });
      })
      .catch(err => console.log(err));
      // eslint-disable-next-line
  }, []);

  if (
    track === undefined ||
    lyrics === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(lyrics).length === 0
  ) {
    return <Spinner />;
  } else {
    return (
      <>
        <Link to="/" className="btn btn-dark btn-sm mb-4">
          Go Back
        </Link>
        <div className="card">
          <h5 className="card-header">
            {track.track.track_name} by{" "}
            <span className="text-secondary">{track.track.artist_name}</span>
          </h5>
          <div className="card-body">
            <p className="card-text">{lyrics.lyrics.lyrics_body}</p>
          </div>
        </div>

        <ul className="list-group mt-3">
          <li className="list-group-item">
            <strong>Song Genre</strong>:{" "}
            {track.track.primary_genres.music_genre_list.length === 0
              ? "NO GENRE AVAILABLE"
              : track.track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name}
          </li>
          <li className="list-group-item">
            <strong>Explicit Words</strong>:{" "}
            {track.track.explicit === 0 ? "No" : "Yes"}
          </li>
          <li className="list-group-item">
            <strong>Release Date</strong>:{" "}
            <Moment format="DD/MM/YYYY">
              {track.track.first_release_date}
            </Moment>
          </li>
        </ul>
      </>
    );
  }
};

export default Lyrics;