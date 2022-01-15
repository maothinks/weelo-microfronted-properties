import User from "../Models/Property";
import PaginationParams from "../Models/PaginationParams";
import axios from 'axios';
import Property from "../Models/Property";
import FilterParams from "../Models/FilterParams";

export default class PropertyService {
    apiServer: string = "https://localhost:44399/Gateway/properties";

    public getProperties(paginationParams:PaginationParams,filterParams:FilterParams, token:string): Promise<Property[]> {
        debugger;
        return new Promise((resolve, reject) => {
            debugger;
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

            axios.get(this.apiServer + pagination + filtering, config)
                .then((res:any) => {
                    resolve(res);
                }). 
                catch(err => {
                    reject(err);
                });
        });
    }

    public createProperty(property:Property, token:string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }

            axios.post(this.apiServer, {
                "name": property.name,
                "address": property.address,
                "price": property.price,
                "codeInternal": property.codeInternal,
                "year": property.year,
                "ownerId": property.ownerId
           }, config)
                .then((res:any) => {
                    resolve(true);
                }).
                catch(err => {
                    reject(err);
                });
        });
    }

    public updateProperty(property:Property, token:string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }

            axios.put(this.apiServer + "/" + property.propertyId, {
                "name": property.name,
                "address": property.address,
                "price": property.price,
                "codeInternal": property.codeInternal,
                "year": property.year,
                "ownerId": property.ownerId
           }, config)
                .then((res:any) => {
                    resolve(true);
                }).
                catch(err => {
                    reject(err);
                });
        });
    }

    public getPropertyById(id:string, token:string): Promise<Property> {
        return new Promise((resolve, reject) => {
            
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }

            axios.get(this.apiServer + "/" + id,  config)
                .then((res:any) => {
                    resolve(res);
                }). 
                catch(err => {
                    reject(err);
                });
        });
    }
  }