export const updateObject=(oldObject,updatedProperties)=>{
    console.log("Utility: ")
    console.log(oldObject)
    console.log(updatedProperties)

    return{
        ...oldObject,
        ...updatedProperties
       
    }
}