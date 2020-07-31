var express = require('express');
var router = express.Router();
const cors = require("../settings/cors");
var axios = require('axios');
const jsonfile = require('jsonfile');
const pathadd = require('path');


// const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
 // const file = `${dirPath}/awcreds.json`
  const file = nw.App.dataPath + "/awcreds.json"
router.options('*', cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
    console.log("may br ptrcheck");
  });

router.get('/',cors.cors,  function(req, res, next) {
    res.send('API is working properly from microsoft');
});



router.post('/testcreds',cors.corsWithOptions, async (req, res, next) => {
  const awurl = req.body.awurl;
  const apikey = req.body.apikey;
  const awencoded = req.body.awencoded;
  const username = req.body.username;

  
  console.log("test", req.body);
   
    
    const url = `${awurl}/api/system/admins/search`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${awencoded}`,
     'aw-tenant-code': `${apikey}`,
     'Accept':'application/json;version=1'
}

const params =  {
sortorder: "ASC",
pagesize: '10000',
username

};

    try {
   const admins = await axios.get(url, 
     
      {  params,
        headers
      })

      if(admins.data){
      console.log("admins all", admins.data);
      console.log("admins ", admins.data.Admins.length)
      // console.log("admins ", admins.data.Admins.filter(admin => !admin.IsActiveDirectoryUser))
       
        res.json(admins.data.Admins);
      }
      
      else res.send("Server error, check your credentials")
    }
    catch(err){
      console.log("deer ",err)
      if(err.toString().includes("ENOTFOUND") ||err.toString().includes("ECONNREFUSED") || err.response.status >= 404 ){
        console.log("Server not responding, check in settings if it is not mispelled")
        res.send("Server not responding or mispelled")
      }
      else if(err.response.data){
      console.log("is ir iccoming ",err.response.data.message)
      res.send(err.response.data.message)}
      else{console.log("Server not responding or mispelled")
        res.send("Server not responding or mispelled")}
   }      
})




router.post('/searchog',cors.corsWithOptions,   (req, res, next) => {
 // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
  //const file = `${dirPath}/awcreds.json`
jsonfile.readFile(file, async function (err, data) {
  if (err) console.error(err)
  
  
  console.dir(data)

  const url = `${data.awurl}/api/system/groups/search`;
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${data.awencoded}`,
 'aw-tenant-code': `${data.apikey}`,
 'Accept':'application/json;version=1'
}

const params =  {
sortorder: "ASC",
pagesize: '10000'
};

let og = {}
try{ og = await axios.get(url, 
 
  {  params,
    headers
  })
  //console.log("og all", og.data);
 
  // console.log("admins ", admins.data.Admins.filter(admin => !admin.IsActiveDirectoryUser))
   
    res.json(og.data.LocationGroups);
  //res.json(og.data.OrganizationGroups); with 'Accept':'application/json;version=2'
} catch(err){
  console.log("deer ",err)
  if(err.toString().includes("ENOTFOUND") ||err.toString().includes("ECONNREFUSED") || err.response.status >= 404 ){
    console.log("Server not responding, check in settings if it is not mispelled")
    res.send("Server not responding or mispelled")
  }
  else if(err.response.data){
  console.log("is ir iccoming ",err.response.data.message)
  res.send(err.response.data.message)}
  else{console.log("Server not responding or mispelled")
    res.send("Server not responding or mispelled")}
}      
})
  
   
})








router.post('/searchalldevicesperog',cors.corsWithOptions,  (req, res, next) => {
 // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
  //const file = `${dirPath}/awcreds.json`
  const lgid = req.body.lgid
 //  console.log("perog ",req.body);
  jsonfile.readFile(file, async function (err, data) {
  if (err) console.error(err)
  
  
    //  console.dir(data)
    const url = `${data.awurl}/api/mdm/devices/search`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${data.awencoded}`,
     'aw-tenant-code': `${data.apikey}`,
     'Accept':'application/json;version=2'
    }

const params =  {
  sortorder: "ASC",
  pagesize: '10000000',
  lgid

};

    
   const devices = await axios.get(url, 
     
      {  params,
        headers
      })
      
    //  console.log("devices ", devices.data.Devices.length)   
    if(devices.data)  res.json(devices.data.Devices)
    
      else res.json([])
    
    }
    
 )

  })

  router.post('/searchallipperog',cors.corsWithOptions,  (req, res, next) => {
   // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
    //const file = `${dirPath}/awcreds.json`
   // console.log("perip ",req.body);
    const lgid = req.body.lgid
  
    jsonfile.readFile(file, async function (err, data) {
    if (err) console.error(err)
    
    
        
      const url = `${data.awurl}/api/mdm/devices/litesearch`;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${data.awencoded}`,
       'aw-tenant-code': `${data.apikey}`,
       'Accept':'application/json;version=2'
      }
  
  const params =  {
    sortorder: "ASC",
    pagesize: '10000000',
     lgid
  
  };
  
      
     

   let devices = await axios.get(url, 
       
        {  params,
          headers
        })
     

       // console.log("devices all", devices.data);
      //  console.log("devices ", devices.data.Devices.length)   
      if(devices.data)  res.json(devices.data.Devices)
      
        else res.json([])
      
      }
      
   )
  
    })



    


      router.post('/searchappsold',cors.corsWithOptions,  (req, res, next) => {
      // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
      //const file = `${dirPath}/awcreds.json`
   //  const apptype = req.body.apptype
   //   const platform = req.body.platform
      console.error(req.body)
      jsonfile.readFile(file, async function (err, data) {
      if (err) console.error(err)
      
          const url = `${data.awurl}/api/mam/apps/search`;
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${data.awencoded}`,
           'aw-tenant-code': `${data.apikey}`
    }
  
    const params =  {
      applicationtype: "internal",
      type: "app",
      platform: "Android",
     // locationgroupid: lgid,
      status: 'Active'
    };
  
          try {
         const apps = await axios.get(url, 
           
            {  params,
              headers
            })
             console.log("is zpps ", apps.data.Application);
              res.json(apps.data.Application);
            
            
          }
          catch(err){
            console.log("deer ",err)
            if(err.toString().includes("ENOTFOUND") ||err.toString().includes("ECONNREFUSED") || err.response.status >= 404 ){
              console.log("Server not responding, check in settings if it is not mispelled")
              res.send("Server not responding or mispelled, check your settings")
            }
            else if(err.response.data){
            console.log("is ir iccoming yoyo",err.response.data.message)
            res.send(err.response.data.message)}
            else{console.log("Server not responding or mispelled")
              res.send("Server not responding or mispelled, check your settings")}
         }      
            
        })
      })

  

      router.post('/searchalldevicespersm',cors.corsWithOptions,  (req, res, next) => {
       // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
        //const file = `${dirPath}/awcreds.json`
        const smartgroupid = req.body.smartgroupid
         
        jsonfile.readFile(file, async function (err, data) {
        if (err) console.error(err)
        
        
          //  console.dir(data)
          const url = `${data.awurl}/api/mdm/smartgroups/${smartgroupid}/devices`;
          console.log("perdev ",url);
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${data.awencoded}`,
           'aw-tenant-code': `${data.apikey}`,
           'Accept':'application/json;version=1'
          }
      
      const params =  {
        sortorder: "ASC",
        pagesize: '10000000'
       
      
      };
      
          
         const devices = await axios.get(url, 
           
            {  params,
              headers
            })
            
          //  console.log("devices ", devices.data.Devices.length)   
          if(devices.data)  res.json(devices.data.Devices)
          
            else res.json([])
          
          }
          
       )
      
        })


        router.post('/searchuuidog',cors.corsWithOptions,  (req, res, next) => {
         // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
          //const file = `${dirPath}/awcreds.json`
          const ogid = req.body.ogid
           
          jsonfile.readFile(file, async function (err, data) {
          if (err) console.error(err)
          
          
            //  console.dir(data)
            const url = `${data.awurl}/api/system/groups/${ogid}`;
            console.log("perdev ",url);
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${data.awencoded}`,
             'aw-tenant-code': `${data.apikey}`,
             'Accept':'application/json;version=1'
            }
        
        const params =  {
          sortorder: "ASC",
          pagesize: '10000000'
         
        
        };
        
            
           const devices = await axios.get(url, 
             
              {  params,
                headers
              })
              
              console.log("devices ", devices.data)   
            if(devices.data)  res.json(devices.data)
            
              else res.json([])
            
            }
            
         )
        
          })



     
        router.post('/searchdevperapp',cors.corsWithOptions,  (req, res, next) => {
         // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
          //const file = `${dirPath}/awcreds.json`
          const applicationid = req.body.applicationid
          console.log(req.body)
          jsonfile.readFile(file, async function (err, data) {
          if (err) console.error(err)
          
          
            //  console.dir(data)
            const url = `${data.awurl}/api/mam/apps/internal/${applicationid}/devices`;
            console.log("perdev ",url);
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${data.awencoded}`,
             'aw-tenant-code': `${data.apikey}`,
             'Accept':'application/json;version=1'
            }
        
        const params =  {
          sortorder: "ASC",
          pagesize: '10000000'
        
        };
        
            
           const devices = await axios.get(url, 
             
              {  params,
                headers
              })
              
    
              console.log("dev ", devices.data)
            //  console.log("devices ", devices.data.Devices.length)   
           if(devices.data) { 
              
              
              res.json(devices.data);}
                 
      //        else res.json([])  
            
            }
            
         )
        
          })


          router.post('/searchdevdetailperapp',cors.corsWithOptions,  (req, res, next) => {
           // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
            //const file = `${dirPath}/awcreds.json`
            const bundleid = req.body.bundleid;
            const oguuid = req.body.oguuid
            console.log(req.body)
            jsonfile.readFile(file, async function (err, data) {
            if (err) console.error(err)
            
            
              //  console.dir(data)
              const url = `${data.awurl}/api/mam/apps/internal/devices?bundleid=${bundleid}&devicetype=Android&apporganizationgroupuuid=${oguuid}&pagesize=100000`;
              console.log("perdev ",url);
              const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${data.awencoded}`,
               'aw-tenant-code': `${data.apikey}`,
               'Accept':'application/json;version=1'
              }
    

             const devices = await axios.get(url, 
               
                { // params,
                  headers
                })
                
      
                console.log("dev ", devices.data)
              //  console.log("devices ", devices.data.Devices.length)   
             if(devices.data) { 
                
                
                res.json(devices.data.devices);}
                   
        //        else res.json([])  
              
              }
              
           )
          
            })

            router.post('/searchapps',cors.corsWithOptions,  (req, res, next) => {
             // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
             //const file = `${dirPath}/awcreds.json`
          //  const apptype = req.body.apptype
          //   const platform = req.body.platform
             console.error(req.body)
             jsonfile.readFile(file, async function (err, data) {
             if (err) console.error(err)
             
                 const url = `${data.awurl}/api/system/productmonitor/apps/search`;
                 const headers = {
                   'Content-Type': 'application/json',
                   'Authorization': `Basic ${data.awencoded}`,
                  'aw-tenant-code': `${data.apikey}`
           }
         
           const params =  {
          
           pagesize: "10000"
           };
         
                 try {
                const apps = await axios.get(url, 
                  
                   {  params,
                     headers
                   })
                    console.log("is zpps ", apps.data);
                     res.send(apps.data);
                   
                   
                 }
                 catch(err){
                   console.log("is ir iccoming ",err)
                }
                   
               })
             })



            router.post('/syncdevices',cors.corsWithOptions,  (req, res, next) => {
             // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
              //const file = `${dirPath}/awcreds.json`
              const deviceid = req.body.deviceid;
              
              console.log(req.body)
              jsonfile.readFile(file, async function (err, data) {
              if (err) console.error(err)
              
              
                //  console.dir(data)
                const url = `${data.awurl}/api/mdm/devices/${deviceid}/commands?command=SyncDevice`;
                console.log("perdev ",url);
                const headers = {
                  'Content-Type': 'application/json',
                  'Authorization': `Basic ${data.awencoded}`,
                 'aw-tenant-code': `${data.apikey}`,
                 'Accept':'application/json;version=1'
                }
            
     
  
               const devices = await axios.post(url,null,
                 
                  {  
                    headers
                  })
                  
        
                  console.log("dev ", devices.statusText)
                //  console.log("devices ", devices.data.Devices.length)   
               if(devices) { 
                 
                  
                  res.json(devices.statusText);}
                     
          //        else res.json([])  
                
                }
                
             )
            
              })


              router.post('/installapps',cors.corsWithOptions,  (req, res, next) => {
               // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
                //const file = `${dirPath}/awcreds.json`
                const deviceid = req.body.deviceid;
                const applicationid = req.body.applicationid;
                const action = req.body.action;
                console.log(req.body)


                jsonfile.readFile(file, async function (err, data) {
                if (err) console.error(err)
                
                
                  //  console.dir(data)
                  //const url = `${data.awurl}/api/mam/apps/${apptype}/${appid}/${action}`;
                  const url = `${data.awurl}/api/mam/apps/internal/${applicationid}/${action}`;
                  console.log("perdev ",url);
                  const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${data.awencoded}`,
                   'aw-tenant-code': `${data.apikey}`,
                   'Accept':'application/json;version=1'
                  }

                  const params =  {
                    deviceId: deviceid
                    };
              
       
    
                 const devices = await axios.post(url,params,
                   
                    {  
                      headers
                    })
                    
          
                    console.log("dev ", devices.statusText)
                  //  console.log("devices ", devices.data.Devices.length)   
                 if(devices) { 
                   
                    
                    res.json(devices.statusText);}
                       
            //        else res.json([])  
                  
                  }
                  
               )
              
                })
  

            



              router.post('/monitorgraph',cors.corsWithOptions,  (req, res, next) => {
               // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
               //const file = `${dirPath}/awcreds.json`
             const uuid = req.body.uuid
            
               console.error(req.body)
               jsonfile.readFile(file, async function (err, data) {
               if (err) console.error(err)
               
                   const url = `${data.awurl}/api/system/productmonitor/products/${uuid}/deploymentstatus`;
                   const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${data.awencoded}`,
                   'aw-tenant-code': `${data.apikey}`,
                   'Accept':'application/json;version=1'
                  }
              
           
             const params =  {
              producttype: "InternalApp"
        
              };
           
                   try {
                  const apps = await axios.get(url, 
                    
                     { 
                       params,
                       headers
                     })
                      console.log("is zpps ", apps.data);
                       res.json(apps.data);
                     
                     
                   }
                   catch(err){
                     console.log("is ir iccoming ",err)
                  }
                     
                 })
               })



            


                router.post('/searchdevice',cors.corsWithOptions,  (req, res, next) => {
                
               
                 // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
                  //const file = `${dirPath}/awcreds.json`
                  const id = req.body.id;
                  const search = req.body.search;
                  console.error(req.body)
                  jsonfile.readFile(file, async function (err, data) {
                  if (err) console.error(err)
             
                  if(data){
                    const url = ` ${data.awurl}/api/mdm/devices`;   
                    const url2 = `${data.awurl}/api/mdm/devices/apps`;
                    
                    const params =  {
                      searchby: search,
                      id
                    };
                  
                    const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': `Basic ${data.awencoded}` ,
                           'aw-tenant-code': `${data.apikey}`,
                           'Accept':'application/json;version=1'
                    }
            
                    const promises = [
                        await axios.get(url, 
                     
                            {  params,
                              headers
                            }).catch(err => {
            
                            //  console.log("deer ",err)
                              if(err.toString().includes("ENOTFOUND")|| err.toString().includes("ECONNREFUSED") ){
                                console.log("Error: Server not responding, check in settings if it is not mispelled")
                                res.send("Server not responding or mispelled, check your settings")
                              }
                              else if(err.response.statusText){
                                console.log('Error dev info: ', JSON.stringify(err.response.statusText));                    
                                res.send("Error: "+err.response.statusText)}
            
                              else{console.log("Server not responding or mispelled")
                                res.send("Server not responding or mispelled, check your settings")
                              }
            
                              }   
                            ),
            
                        
                     
                          await axios.get(url2, 
                     
                                  {  params,
                                    headers
                                  }).catch(e => console.log('Error app: ', e.message))
            
                                 
            
                    ];
            
                    
                    const awdevice = Promise.all(promises).then(data => {
                        console.log("device", data.length);
                        console.log("apps", data[1].data);
                        
            
            
                        if (data[0].data.Platform === "Android")
                        res.json([data[0].data, data[1].data]); 
                       else res.send("OtherPhoneDevice")
                    })
              
                      .catch(err=>{
                      console.log("is ir iccoming ",err.response.data)
                      res.send(err.response.data.message)
                      }
                      )
                   } else res.send("Please56785678");

                    
                
                       })

                })



                
                router.post('/actionapp',cors.corsWithOptions,  (req, res, next) => {

                 // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
                  //const file = `${dirPath}/awcreds.json`
                  const appid = req.body.appid;
                  const apptype = "internal";
                  const action = req.body.action;
                  const DeviceId = req.body.DeviceId;
                  console.error(req.body)
                  jsonfile.readFile(file, async function (err, data) {
                  
                    if (err) console.error(err)
                 
                  
                    const url = `${data.awurl}/api/mam/apps/${apptype}/${appid}/${action}`;

                    console.log(url);
                    const headers = {
                      'Content-Type': 'application/json',
                      'Authorization': `Basic ${data.awencoded}`,
                     'aw-tenant-code': `${data.apikey}`
              }
               console.log(url)
              const params =  {
                DeviceId
              };
            
                    try {
                   const act = await axios.post(url,params, 
                     
                      {  
                        headers
                      })
                        console.log("is zpps ", act.status +' '+ act.statusText);
                        res.send(act.status);
                      
                      
                    }
                    catch(err){
                      console.log("is ir iccoming ",err.response.data)
                      res.send(err.response.data.message)
                   }
                      
                  })
                })



                router.post('/searchappsfortest',cors.corsWithOptions,  (req, res, next) => {

                 // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
                  //const file = `${dirPath}/awcreds.json`
                 
                  const platform = "Android";
                  const apptype = "Internal";
                  const lgid = req.body.lgid;
                  console.log(req.body);
                  jsonfile.readFile(file, async function (err, data) {
                  
                    if (err) console.error(err)
                    
                    const url = `${data.awurl}/api/mam/apps/search`;
                    const headers = {
                      'Content-Type': 'application/json',
                      'Authorization': `Basic ${data.awencoded}`,
                     'aw-tenant-code': `${data.apikey}`
              }
            
              const params =  {
                applicationtype: apptype,
                type: "app",
                platform,
                locationgroupid: lgid,
                status: 'Active'
              };
            
                    try {
                   const apps = await axios.get(url, 
                     
                      {  params,
                        headers
                      })
                   //    console.log("is zpps ", apps.data.Application);
                        res.json(apps.data.Application);
                      
                      
                    }
                    catch(err){
                      console.log("is ir iccoming yoyo ",err)
                   }
                      
                  })
                })
            
            
                
            
                router.post('/assignsmapp', cors.corsWithOptions,  (req, res, next) => {
            
                 // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
                  //const file = `${dirPath}/awcreds.json`
                 
                  const gid = req.body.gid;
                  const appid = req.body.appid;
                  const DeviceId = req.body.DeviceId;
                  const type = "internal";
                  console.log(req.body);
                  
                 
                  jsonfile.readFile(file, async function (err, data) {
                  
                    if (err) console.error(err)
            
                    const url0 = `${data.awurl}/api/mdm/smartgroups/search`;
                    const url1 = `${data.awurl}/api//mdm/smartgroups`;
                  
                    const headers = {
                      'Content-Type': 'application/json',
                      'Authorization': `Basic ${data.awencoded}`,
                     'aw-tenant-code': `${data.apikey}`
              }
            
              const params =  {
                "name" : "dummy-sm-"+DeviceId
              };
            
              
            
              try {
                console.log("sm when sm created ");
              const sm = await axios.get(url0, 
                     
                {  params,
                  headers
                }
                
                ).then(async sm =>{
                  if (sm.data && sm.data.SmartGroups[0].Name===`dummy-sm-${DeviceId}`) {
            
                    
                    console.log("sm when sm created ", sm.data.SmartGroups[0].SmartGroupID);
                    const url2 = `${data.awurl}/api/mam/apps/${type}/${appid}/smartgroups/${sm.data.SmartGroups[0].SmartGroupID}`;
                    console.log("urlwhen sm created ", url2);
                  let sm1 =  await axios.post(url2, null,
                      {  
                        headers
                      })
                     console.log("sm1 ", sm1.status)
                     res.send(sm1.status);
                 
                 
                  }
                  else {
                    const params =  {
                      "Name" : "dummy-sm-"+DeviceId, 

                  //    "ManagedByOrganizationGroupId": null,
                      "CriteriaType": "UserDevice",
                  //    "OrganizationGroups":[{}],
                     // "Devices":[{   "Id":DeviceId }],
                      "DeviceAdditions":[{"Id":DeviceId }]
                  
                       };
                     
                       try {
                         console.log("sm not created");
                        await axios.post(url1, params,
                        
                         {  
                           headers
                         }).then(async sm => {console.log("sm when sm not created", sm.data.Value)
                         const url2 = `${data.awurl}/api/mam/apps/${type}/${appid}/smartgroups/${sm.data.Value}`;
                       let sm1 =  await axios.post(url2, null,
                           {  
                             headers
                           })
                          console.log("sm1 not created ", sm1.status)
                          res.send(sm1.status);
                       })
                          
                       }
                       catch(err){
                         console.log("is ir iccoming ",err)
                      }
            
                  }
                })
               
                }
            
              catch(err){
                console.log("is ir iccoming ",err)
             }
            
                 })
              })
            


                
              router.post('/searchdevicebydevid',cors.corsWithOptions,  (req, res, next) => {
                
               
                 // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
                  //const file = `${dirPath}/awcreds.json`
                  const id = req.body.id;
               
                  console.error(req.body)
                  jsonfile.readFile(file, async function (err, data) {
                  if (err) console.error(err)
             
                  if(data){
                    const url = ` ${data.awurl}/api/mdm/devices/${id}`;   
                    const url2 = `${data.awurl}/api/mdm/devices/${id}/apps`;
                    
                    const params =  {
                      
                    }; 
                  
                    const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': `Basic ${data.awencoded}` ,
                           'aw-tenant-code': `${data.apikey}`,
                           'Accept':'application/json;version=1'
                    }
            
                    const promises = [
                        await axios.get(url, 
                     
                            { params,
                              headers
                            }).catch(err => {
            
                            //  console.log("deer ",err)
                              if(err.toString().includes("ENOTFOUND") ||err.toString().includes("ECONNREFUSED")){
                                console.log("Error: Server not responding, check in settings if it is not mispelled")
                                res.send("Server not responding or mispelled, check your settings")
                              }
                              else if(err.response.statusText){
                                console.log('Error dev info: ', JSON.stringify(err.response.statusText));                    
                                res.send("Error: "+err.response.statusText)}
            
                              else{console.log("Server not responding or mispelled")
                                res.send("Server not responding or mispelled, check your settings")}
            
                              }   
                            ),
            
                        
                     
                          await axios.get(url2, 
                     
                                  {  params,
                                    headers
                                  }).catch(e => console.log('Error app: ', e.message))
            
                                 
            
                    ];
            
                    
                    const awdevice = Promise.all(promises).then(data => {
                        console.log("device", data.length);
                   //     console.log("device", data[0].filter(item => item.Platform === "Android").data);
                      //  console.log("apps", data[0].data);
                        console.log("device", data[0].data);
                        
            
            
                      if (data[0].data.Platform === "Android")
                        res.json([data[0].data, data[1].data]); 
                       else res.send("OtherPhoneDevice")

                    })
              
                      .catch(err=>{
                      console.log("is ir iccoming ",err.response.data)
                      res.send(err.response.data.message)
                      }
                      )
                   } else res.send("Please56785678");

                    
                
                       })

                })


                router.post('/refreshappsfordev',cors.corsWithOptions,  (req, res, next) => {
                
               
                 // const dirPath = pathadd.join(process.cwd(), '/routes/settings/');
                  //const file = `${dirPath}/awcreds.json`
                  const id = req.body.id;
               
                  console.error(req.body)
                  jsonfile.readFile(file, async function (err, data) {
                  if (err) console.error(err)
             
                  if(data){
                     
                    const url2 = `${data.awurl}/api/mdm/devices/${id}/apps`;
                    
                    const params =  {
                      
                    }; 
                  
                    const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': `Basic ${data.awencoded}` ,
                           'aw-tenant-code': `${data.apikey}`,
                           'Accept':'application/json;version=1'
                    }
            
                    
            
                        
                     
                    const awdevice= await axios.get(url2, 
                     
                                  {  params,
                                    headers
                                  }).catch(e => console.log('Error app: ', e.message))
  
  
                    console.log("data apps refresh ",[awdevice.data])
                    res.json([awdevice.data]) 
            
                    
            
                    
                 
                   } else res.send("Please56785678");
  
                    
                
                       })
  
                })
  
  
                

module.exports = router;
