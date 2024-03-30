--COMMAND TO START MONGO DB
docker run -d -p 27017:27017 --name mongodb -v mongodb_data:/data/db mongo

IF ERROR IN STARTING:   
        docker ps -a
        docker kill containerid
         
aggrigation pipeline


admin

{
    "username" : "demo10@gmail.com",
    "password" : "demo123"
}