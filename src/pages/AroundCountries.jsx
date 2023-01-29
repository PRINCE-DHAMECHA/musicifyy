import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundCountries = () => {
  const [country, setCountry] = useState("IN");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    setCountry("IN");
  }, []);

  const handleSelect = (e) => {
    setCountry(e.target.value);
    console.log(e.target.value);
    if (isFetching && loading)
      return <Loader title="Loading Songs around you..." />;
  };

  if (isFetching && loading)
    return <Loader title="Loading Songs around you..." />;

  if (error && country !== "") return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around you{" "}
        <select
          className="bg-transparent hover:text-[#06b6d4] outline-none text-white"
          value={country}
          onChange={handleSelect}
        >
          <option value={"IN"}>India</option>
          <option value={"US"}>USA</option>
          <option value={"GB"}>UK</option>
          <option value={"JP"}>Japan</option>
          <option value={"RU"}>Russia</option>
          <option value={"UA"}>Ukrain</option>
        </select>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundCountries;
