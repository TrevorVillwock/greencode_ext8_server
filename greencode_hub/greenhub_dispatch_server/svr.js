const express = require('express'); //require reads a JavaScript file, executes the file, 
                                    //and then proceeds to return the exports object
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const { exec } = require("child_process");
const multer = require('multer');
const fs = require('fs');
var upload = multer(); //Multer is a node.js middleware for handling  
                       //multipart/form-data, which is primarily used for uploading files

const app = express(); 
const test1 = require('./jtest.json')
// import * as test1 from './jtest.json';

// enable files upload
app.use(fileUpload({ 
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Method', 'POST');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
})

//start app
const port = process.env.PORT || 9898;
const ip = '0.0.0.0';
app.listen(port, ip, () =>
    console.log(`App is listening on port ${port} and ip ${ip}.`)
);


let results = [];
let fileNum = 0;

function submitJob(fileToRun) {
    fileToRun.file.mv(`./uploads/received_file_${fileNum}.py`);
    exec(`bash ./CPU_GPU_Profiling/powerlog 1 test 10 ${fileNum}`, (error, stdout, stderr) => {
        if(error){
            console.log(`error: ${error.message}`);
        }
        if(stderr){
            console.log(`stderr: ${stderr}`);
        }

        console.log(`stdout: ${stdout}`);
    });
    let result = {};
    result.id = fileToRun.id;
    result.num = fileNum;
    results.push(result);
    fileNum++;
}

app.post('/id', (req, res, next) => {
    let fileObject = {}
    fileObject.id = Date.now();
    fileObject.file = req.files.file
    res.send(fileObject)
    submitJob(fileObject)
});

app.post('/api', (req, res) => {
    console.log(req.body);
});


app.get('/results/gpu', (req, res) => {
    idToFind = req.query.id;
    for (index = 0; index < results.length; index++) {
        if (idToFind == results[index].id) {
            let num = results[index].num;
            let sent = false;
            while (sent == false) {
                if (fs.existsSync(`Done_${num}`)) {
                    res.sendFile(`/home/mahler7/green-ext/greencode-ext3/greencode_hub/greenhub_dispatch_server/CPU_GPU_Profiling/GPU_test.csv`)
                    sent = true
                }
            }
        }
    }
});

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/results/cpu', (req, res) => {
    idToFind = req.query.id;
    for (index = 0; index < results.length; index++) {
        if (idToFind == results[index].id) {
            let num = results[index].num;
            let sent = false;
            while (sent == false) {
                if (fs.existsSync(`Done_${num}`)) {
                    res.sendFile(`/home/mahler7/green-ext/greencode-ext3/greencode_hub/greenhub_dispatch_server/CPU_GPU_Profiling/CPU_test.csv`)
                    for (position = index + 1; position < results.length; position++) {
                        results[position - 1] = results[position];
                    }
                    results.splice(results.length - 1, 1);
                    sent = true;
                }
            }
        }
    }
});
