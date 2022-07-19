import { useState } from 'react'
import axios from 'axios'
import { ServerName } from "../../serverName";

import './Images.css'

async function postImage({image}) {
  const formData = new FormData();
  formData.append("image", image);
    console.log(image)
    console.log(formData)
const result = await axios.post(`${ServerName}/api/gifs/images`, formData, { headers: {'Content-Type': 'multipart/form-data; charset=utf-8', "ACCEPT": "*/*"}})
  console.log(result)
  return result.data
}


function Images() {

  const [file, setFile] = useState("")
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file})
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
    console.log(file)
    setFile(file)
	}

  return (
    <div className="App">
      <form onSubmit={submit} enctype = "multipart/form-data" accept-charset="UTF-8">
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <button type="submit">Submit</button>
      </form>

    </div>
  );
}

export default Images;
