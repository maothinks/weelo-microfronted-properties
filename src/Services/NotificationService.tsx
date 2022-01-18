
import axios from 'axios';
import PropertyImage from "../Models/PropertyImage";
import appSettings from "../appSettings.json"
import PropertyView from '../Models/PropertyView';

export default class NotificationService  {

    // Notify a new view on a specific property
    public NotifyPropertyView(propertyView:PropertyView, token:string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }

            axios.post("https://localhost:44305/api/NotifyViews", {
                "PropertyId": propertyView.PropertyId,
                "UserId": propertyView.UserId,
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
  }