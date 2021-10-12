// console.log("hello")

let form= document.getElementById('myform')
form.addEventListener('submit',(event)=>{
    console.log('test')
    event.preventDefault()
    weatherFunction()
    form.reset()
})

let weatherFunction= async()=>{
    try{
        const address= document.getElementById('address').value
        const res= await fetch('http://localhost:3000/weather?address='+address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            document.getElementById('error').innerText=data.error
            document.getElementById('location').innerText=""
            document.getElementById('forecast').innerText=""
        }
        else {
            document.getElementById('location').innerText=data.location
            document.getElementById('forecast').innerText=data.forecast
            document.getElementById('error').innerText=""



        }
        
    }
    catch(e){
        console.log(e)
    }
}