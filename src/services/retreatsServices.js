import axios from 'axios';

export const getRetreatsService=async(page)=>{
    try{
        const response=await axios.get(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=${page}&limit=3`);
        return response
    }catch(e){
        throw e;
    }
}

export const searchRetreatsService=async(search,page)=>{
    try{
        const response=await axios.get(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?search=${search}&page=${page}&limit=3`);
        console.log(search)
        return response
    }catch(e){
        throw e;
    }
}

export const searchRetreatsByTypeService=async(type,page)=>{
    try{
        const response=await axios.get(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?tag=${type}&page=${page}&limit=3`)
        return response;
    }
    catch(e){
        throw e;
    }
}

export const getAllRetreats=async()=>{
    try{
        const response=await axios.get("https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats");
        return response;
    }catch(e){
        throw e;
    }
}

export const getFilteredRetreatsService=async(search,type,page)=>{
    try{
        const response=await axios.get(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?tag=${type}&location=${search}&page=${page}&limit=3`);
        return response;
    }catch(e){
        if(e?.response?.status===404){
            try{
                const response=axios.get(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?tag=${type}&search=${search}&page=${page}&limit=3`);
                return response;
            }
            catch(e){
                throw e
            }
        }
        else{
            throw e
        }
    }
}

export const getRetreatDataService=async(id)=>{
    try{
        const response=await axios.get(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats/${id}`);
        return response;
    }catch(e){
        throw e;
    }
}