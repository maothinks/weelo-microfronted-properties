import User from "../Models/Property";
import PaginationParams from "../Models/PaginationParams";
import axios from 'axios';
import Property from "../Models/Property";
import FilterParams from "../Models/FilterParams";
import appSettings from "../appSettings.json"

export default class PropertyService {

    // Get properrties pagination and filtering based
    public getProperties(paginationParams:PaginationParams,filterParams:FilterParams, token:string): Promise<Property[]> {
        return new Promise((resolve, reject) => {
            var pagination = "?page=" + paginationParams.Page + "&itemsperpage=" + paginationParams.ItemsPerPage;
            var filtering = "&name=" + filterParams.name;
            filtering = filtering + "&maxPrice=" + filterParams.maxPrice;
            filtering = filtering + "&maxViews=" + filterParams.maxViews;
            filtering = filtering + "&maxYear=" + filterParams.maxYear;
            filtering = filtering + "&minPrice=" + filterParams.minPrice;
            filtering = filtering + "&minViews=" + filterParams.minViews;
            filtering = filtering + "&minYear=" + filterParams.minYear;

            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }

            axios.get(appSettings.ServerGateway + "properties" + pagination + filtering, config)
                .then((res:any) => {
                    if (!res.data.success) { 
                        reject(res.data.message);
                    }

                    resolve(res);
                }). 
                catch(err => {
                    reject(err);
                });
        });
    }

    // Creates a new property
    public createProperty(property:Property, token:string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }

            axios.post(appSettings.ServerGateway + "properties", {
                "name": property.name,
                "address": property.address,
                "price": property.price,
                "codeInternal": property.codeInternal,
                "year": property.year,
                "ownerId": property.ownerId
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

    // Updates an specific properties
    public updateProperty(property:Property, token:string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }

            axios.put(appSettings.ServerGateway + "properties/" + property.propertyId, {
                "name": property.name,
                "address": property.address,
                "price": property.price,
                "codeInternal": property.codeInternal,
                "year": property.year,
                "ownerId": property.ownerId
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

    // Get a property by Id
    public getPropertyById(id:string, token:string): Promise<Property> {
        return new Promise((resolve, reject) => {
            
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }

            axios.get(appSettings.ServerGateway + "properties/" + id,  config)
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