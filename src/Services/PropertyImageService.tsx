
import axios from 'axios';
import PropertyImage from "../Models/PropertyImage";
import appSettings from "../appSettings.json"

export default class PropertyImageService {

    // Create a new Image Property
    public createImageProperty(propertyImage:PropertyImage, token:string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }

            axios.post(appSettings.ServerGateway + "propertyImages", {
                "propertyId": propertyImage.propertyId,
                "filePath": propertyImage.filePath,
                "enabled": propertyImage.enabled,
           }, config)
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

    // get images properties by propertyId
    public getAllByPropertyId(propertyId:string, token:string): Promise<PropertyImage[]> {
        return new Promise((resolve, reject) => {
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }

            axios.get(appSettings.ServerGateway + "propertyImages/GetAllByPropertyId/" + propertyId, config)
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