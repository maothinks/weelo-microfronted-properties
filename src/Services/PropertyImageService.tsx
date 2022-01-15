
import axios from 'axios';
import PropertyImage from "../Models/PropertyImage";

export default class PropertyImageService {
    apiServer: string = "https://localhost:44399/Gateway/propertyImages";

    public createImageProperty(propertyImage:PropertyImage, token:string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }

            axios.post(this.apiServer, {
                "propertyId": propertyImage.propertyId,
                "filePath": propertyImage.filePath,
                "enabled": propertyImage.enabled,
           }, config)
                .then((res:any) => {
                    resolve(true);
                }).
                catch(err => {
                    reject(err);
                });
        });
    }

    public getAllByPropertyId(propertyId:string, token:string): Promise<PropertyImage[]> {
        return new Promise((resolve, reject) => {
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }

            axios.get(this.apiServer + "/GetAllByPropertyId/" + propertyId, config)
                .then((res:any) => {
                    resolve(res);
                }). 
                catch(err => {
                    reject(err);
                });
        });
    }
  }