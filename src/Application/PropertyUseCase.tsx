import FilterParams from "../Models/FilterParams";
import PaginationParams from "../Models/PaginationParams";
import Property from "../Models/Property";
import PropertySerice from "../Services/PropertyService";

export default class PropertyUseCase {
    public getProperties(paginationParams:PaginationParams,filterParams:FilterParams, token:string): Promise<Property[]> {
        return new Promise((resolve, reject) => {
            new PropertySerice().getProperties(paginationParams, filterParams, token).then((result) =>{
                resolve(result);
            }).
            catch(err => {
                reject(err);
            });;
        });
    }

    public createProperty(property:Property, token:string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            new PropertySerice().createProperty(property, token).then((result) =>{
                resolve(result);
            }).
            catch(err => {
                reject(err);
            });
        });
    }

    public updateProperty(property:Property, token:string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            new PropertySerice().updateProperty(property, token).then((result) =>{
                resolve(result);
            }).
            catch(err => {
                reject(err);
            });
        });
    }

    public getPropertyById(id:string, token:string): Promise<Property> {
        return new Promise((resolve, reject) => {
            new PropertySerice().getPropertyById(id, token).then((result) =>{
                resolve(result);
            }).
            catch(err => {
                reject(err);
            });;
        });
    }
  }