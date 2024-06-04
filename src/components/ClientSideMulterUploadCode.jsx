import React, { useEffect, useState } from 'react';

const ClientSideMulterUploadCode = () => {

    const host = "http://localhost:4000"
    
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const [error, setError] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            console.log("Select a file");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            console.log('Size limit exceeded');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${host}
            /api/student/profile/profileImage`, {
                method: "POST",
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
                body: formData
            });
            const json = await response.json();
            console.log(json);
            setImage(json.profileimage);
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Error uploading file');
        }
    }

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`${host}
                /api/student/profile/getImage`);
                const json = await response.json();
                console.log(json);
                if (json && json.length > 0 && json[0].profileimage) {
                    setImage(json[0].profileimage);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
                setError('Error fetching image');
            }
        };
        fetchImage();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div>
                <input type="file" name="" id="" onChange={e => setFile(e.target.files[0])} />
                <button onClick={handleUpload}>Upload</button>
            </div>

            <div>
                {image && <img src={`${host}
/uploads/${image}`} alt="" style={{ width: '50%' }} />}
                {error && <p>{error}</p>}
            </div>
        </>
    );
};

export default ClientSideMulterUploadCode;
