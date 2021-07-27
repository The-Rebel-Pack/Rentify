import React, { useState } from "react";
const Cloudinary = () => {
    const [image, setImage] = useState("");

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "rentify");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/ddenalelw/image/upload",
            { method: "POST", body: data }
        );
        const file = await res.json();
        console.log(file);
        setImage(file.secure_url);
    };

    return (
        <div>
            <h4>Upload Image</h4>
            <input
                type="file"
                name="file"
                placeholder="Upload Image"
                onChange={uploadImage}
            />
            {console.log(image)}
           <img src={image} alt={image} />
        </div>
    );
};

export default Cloudinary;
