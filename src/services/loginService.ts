import { BASE_URL } from "constants/global";

export const singIn=(usuario:string,contrasenia:string,keepLogin:boolean)=> new Promise((resolve, reject)=>{
    fetch(`${BASE_URL}auth/signin`, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({ usuario, password:contrasenia })
    }).then(resp=>{
        
        if(resp.ok){
            console.log('Loggin');
            return resp.json();
        }else{
            resolve({isLogged:false,data:null});
        }
    }).then(data=>{
        if(data.code===201){
            const response={isLogged:true,data:{token:data.auth_token,r_token:data.refresh_token,user:data.user}}
            if(keepLogin){
                localStorage.setItem('isLogged','true');
                localStorage.setItem('data',JSON.stringify(response));
            }else{
                sessionStorage.setItem('isLogged','true');
                sessionStorage.setItem('data',JSON.stringify(response));
            }
            resolve(response);
        }else{
            resolve({
                islogged:false,
                data:null
            });
        }
    }).catch(err=>{
        reject({'error':err});
    });
});