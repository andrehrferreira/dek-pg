import { $ } from "@dekproject/scope";
const { Client } = require('pg');

export default () => {
    try{
        let dbConfig = {};
        let env = process.env;
        let configApproved = true;

        if(env.hasOwnProperty('PG_USER') || !!env.PG_USER)
            dbConfig['PG_USER'] = env.PG_USER

        if(env.hasOwnProperty('PG_PASSWORD') || !!env.PG_PASSWORD)
            dbConfig['PG_PASSWORD'] = env.PG_PASSWORD

        if(env.hasOwnProperty('PG_HOST') && !!env.PG_HOST)
            dbConfig['PG_HOST'] = env.PG_HOST
        else {
            configApproved = false
            console.log('[ PostgreSQL ] - There is no PG_HOST variable in the .env file.')
        }

        if(env.hasOwnProperty('PG_PORT') && !!env.PG_PORT)
            dbConfig['PG_PORT'] = env.PG_PORT
        else {
            configApproved = false
            console.log('[ PostgreSQL ] - There is no PG_PORT variable in the .env file.')
        }
        
        if(env.hasOwnProperty('PG_DB') && !!env.PG_DB)
            dbConfig['PG_DB'] = env.PG_DB
        else {
            configApproved = false
            console.log('[ PostgreSQL ] - There is no PG_DB variable in the .env file')
        }

        if(!configApproved){
            console.log('[ PostgreSQL ] - Please correct the above errors before restarting the application.')
            process.exit(-1);
        }
        else {
            try {
                const client = new Client({
                    host: dbConfig['PG_HOST'],
                    port: dbConfig['PG_PORT'],
                    user: dbConfig['PG_USER'],
                    password: dbConfig['PG_PASSWORD'],
                    database: dbConfig['PG_DB']
                });

                client.connect(err => {
                    if(process.env.DEBUG == 'true'){
                        if (err)
                            console.log(`[ PostgreSQL ] -`, err.stack);
                        else{
                            console.log(`[ PostgreSQL ] - PostgreSQL successfully signed`);    
                            $.set("pg", client);    
                        }
                                    
                    } 
                });
            }
            catch (e) {
                console.log(`[ PostgreSQL ] - ${e.message}`);
            }
        }
    }
    catch (e) {
        console.log(`[ PostgreSQL ] - ${e.message}`);
    }
}
