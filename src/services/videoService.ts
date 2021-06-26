import { GenericService } from "./genericService";

export class VideoService extends GenericService{
    findAllFilter=(filter:any)=>{
        return new Promise((resolve, reject)=>{
            const headers={ 'Content-type': 'Application/json','x-acces-token':this.access_token};

            fetch(`${this.url}?fecha_inicial=${filter.fecha_inicial?filter.fecha_inicial:''}&fecha_final=${filter.fecha_final?filter.fecha_final:''}&hora=${filter.hora?filter.hora:''}&sereno=${filter.sereno?filter.sereno:''}`+
            `&evi=${filter.evi?filter.evi:''}&inc=${filter.inc?filter.inc:''}&vid=${filter.vid?filter.vid:''}`,{headers,method: 'GET'})
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
}