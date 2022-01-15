import PropertyImage from "../Models/PropertyImage";
import PropertyImageService from "../Services/PropertyImageService";

export default class PropertyImageUseCase {

    public createProperty(propertyImage: PropertyImage, token: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            new PropertyImageService().createImageProperty(propertyImage, token).then((result) => {
                resolve(result);
            }).
                catch(err => {
                    reject(err);
                });
        });
    }

    public getAllByPropertyId(propertyId: string, token: string): Promise<PropertyImage[]> {
        return new Promise((resolve, reject) => {
            new PropertyImageService().getAllByPropertyId(propertyId, token).then((result) => {
                resolve(result);
            }).
                catch(err => {
                    reject(err);
                });
        });
    }
}