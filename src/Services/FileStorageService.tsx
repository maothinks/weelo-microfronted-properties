import Image from "../Models/Image";
import axios from 'axios';
import appSettings from "../appSettings.json"

export default class FileStorageService {

    // Calls the firestorage service to upload the image and returns and image url
    public uploadImage(image:Image, token:string): Promise<string> {
        return new Promise((resolve, reject) => {
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }

            axios.post(appSettings.ServerGateway + "Images/UploadImage", { image: image.image, imageName:image.imageName, id: image.id } , config)
                .then((res:any) => {
                    if (!res.data.success) { 
                        reject(res.data.message);
                    }

                    resolve(res.data.message);
                }). 
                catch(err => {
                    reject(err);
                });
        });
    }
  }