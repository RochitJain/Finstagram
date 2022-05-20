import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Buffer } from "buffer";

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
    const fileURL = URL.createObjectURL(file);
    getData(fileURL);
    //Open the URL on new Window
    // ?    // console.log(response.data.result);
    // getData(response.data.result.data);
  };
  // const img = new Buffer.from(data).toString("base64");
  //return <div>{valid && img}</div>;
  return (
    <div>
      {" "}
      <img src={data} />
    </div>
  );
}

export default ShortUrl;
