import Image from "../Models/Image";
import axios from 'axios';
import Property from "../Models/Property";

export default class FileStorageService {
    apiServer: string = "https://localhost:44399/Gateway/Images";

    public uploadImage(image:Image, token:string): Promise<string> {
        return new Promise((resolve, reject) => {
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }

            axios.post(this.apiServer + "/UploadImage", { image: image.image, imageName:image.imageName, id: image.id } , config)
                .then((res:any) => {
                    resolve(res);
                }). 
                catch(err => {
                    reject(err);
                });
        });
    }
  }