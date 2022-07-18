import { useState } from 'react'
import axios from 'axios'
import { ServerName } from "../../serverName";

import './Images.css'

async function postImage({image, description}) {
  const formData = new FormData();
  formData.append("image", image, encodeURI(image));
  formData.append("description", description)


  const result = await axios.post(`${ServerName}/api/gifs/images`, formData, { headers: {'Content-Type': 'multipart/form-data'}}).then((req) => console.log(req.data.imagePath))
}


function Images() {

  const [file, setFile] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file, description})
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input value={description} onChange={e => setDescription(e.target.value)} type="text" ></input>
        <button type="submit">Submit</button>
      </form>

    </div>
  );
}

export default Images;
