import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShortUrl() {
  const { id } = useParams();
  const [data, getData] = useState();

  useEffect(() => {
    result();
  }, []);

  const result = async () => {
    const response = await axios({
      method: "GET",
      url: `http://localhost:3001/url/${id}`,
      responseType: "blob",
    });
    //console.log(response.data);
    const file = new Blob(response.data.result, {
      type: "image/jpeg",
    });
    //Build a URL from the file
    //const fileURL = URL.createObjectURL(file);
    getData(response.data);
    console.log(response.data);
  };

  const src = `data:image/png;base64 ${data}`;
  return (
    <div>
      {" "}
      <img className="blob-to-image" src={src}></img>
    </div>
  );
}

export default ShortUrl;
