import React, {useState} from 'react';

const Weapon = () => {

  const [fileImage, setFileImage] = useState("");
  const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) =>{
    // @ts-ignore
    setFileImage(URL.createObjectURL(event.target.files[0]));
  };
  const deleteFileImage = () =>{
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };
  return (
      <>
        <h1>이미지 업로드 </h1>
          <div style={{
              alignItems: "center",
              justifyContent: "center", }} >
              <input
                  name="imggeUpload"
                  type="file"
                  accept="image/*"
                  onChange={saveFileImage} />
            </div>
              <div>
                <h1>미리보기 이미지</h1>
              </div>
                <div>{fileImage && ( <img alt="sample" src={fileImage}
                style={{ margin: "auto" }} /> )}
                <button style={{
                  width: "50px",
                  height: "30px",
                  cursor: "pointer", }}
                        onClick={() => deleteFileImage()} > 삭제 </button>
              </div>
      </>
  );
}
export default Weapon;