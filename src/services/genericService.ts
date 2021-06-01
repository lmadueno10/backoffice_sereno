import { BASE_URL } from "constants/global";

export class GenericService {
    url:string;
    access_token:string;
    constructor(endPoint:string,token:string) {
      this.url=BASE_URL+endPoint;
      this.access_token=token;
    }

    findAll=()=>{
        return new Promise((resolve, reject)=>{
            const headers={ 'Content-type': 'Application/json','x-acces-token':this.access_token};
            fetch(this.url,{headers,method: 'GET'})
            .then(data=>{
                if(data){
                    return data.json();
                }else{
                    resolve({data:undefined})
                }
            }).then(resp=>{
                resolve(resp);
            }).catch(err=>{
                reject(err);
            })
        })
    }

    update=(object:any,objectId:any)=>{
        return new Promise((resolve,reject)=>{
            const headers={ 'Content-type': 'Application/json','x-acces-token':this.access_token};
            fetch(`${this.url}/${objectId}`,{headers,method: 'PUT',body:JSON.stringify(object)})
            .then(data=>{
                if(data){
                    return data.json();
                }else{
                    resolve({data:undefined});
                }
            }).then(resp=>{
                resolve(resp);
            }).catch(err=>{
                reject(err);
            })
        })
    }

    create=(object:any)=>{
        return new Promise((resolve,reject)=>{
            const headers={ 'Content-type': 'Application/json','x-acces-token':this.access_token};
            fetch(`${this.url}`,{headers,method: 'POST',body:JSON.stringify(object)})
            .then(data=>{
                if(data){
                    return data.json();
                }else{
                    resolve({data:undefined});
                }
            }).then(resp=>{
                resolve(resp);
            }).catch(err=>{
                reject(err);
            })
        })
    }

    delete=(objectId:any)=>{
        return new Promise((resolve,reject)=>{
            const headers={ 'Content-type': 'Application/json','x-acces-token':this.access_token};
            fetch(`${this.url}/${objectId}`,{headers,method: 'DELETE'})
            .then(data=>{
                resolve({data:'not content'});
            }).catch(err=>{
                reject(err);
            })
        })
    }
}