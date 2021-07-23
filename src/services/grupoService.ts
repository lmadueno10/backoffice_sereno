import { GenericService } from "./genericService";

export class GrupoService extends GenericService{
    fetchPersonalDisponible=(id:number)=>{
        return new Promise((resolve, reject)=>{
            const headers={ 'Content-type': 'Application/json','x-acces-token':this.access_token};

            fetch(`${this.url}/${id}/disponibles`,{headers,method: 'GET'})
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

    fetchPersonalAsignado=(id:number)=>{
        return new Promise((resolve, reject)=>{
            const headers={ 'Content-type': 'Application/json','x-acces-token':this.access_token};

            fetch(`${this.url}/${id}/asignados`,{headers,method: 'GET'})
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

    asignarPersonal=(object:any)=>{
        return new Promise((resolve,reject)=>{
            const headers={ 'Content-type': 'Application/json','x-acces-token':this.access_token};
            fetch(`${this.url}/asignar`,{headers,method: 'POST',body:JSON.stringify(object)})
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

    removePersonal=(idGrupo:any,idPersonal:any)=>{
        return new Promise((resolve,reject)=>{
            const headers={ 'Content-type': 'Application/json','x-acces-token':this.access_token};
            fetch(`${this.url}/remover/${idGrupo}/${idPersonal}`,{headers,method: 'DELETE'})
            .then(data=>{
                resolve({data:'not content'});
            }).catch(err=>{
                reject(err);
            })
        })
    }
}