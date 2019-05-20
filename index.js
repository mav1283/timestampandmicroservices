const express = require("express");
const cors = require("cors");
const PORT = 3000;

const app = express();

app.use(cors({optionSuccessStatus: 200})); 
app.use(express.json());


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/timestamp/:dateparam',(req,res)=>{

	const dateparam = req.params.dateparam;

	const dateFormatOptions = {
	  year: 'numeric',
	  month: 'long',
	  day: 'numeric'
	}

	if(isNaN(dateparam)){
	  let utcdate = new Date(dateparam);
	  utcdate = utcdate.toLocaleDateString("en-us",dateFormatOptions);
	  let unixdate = new Date(dateparam).getTime()/1000;
	  res.json({"unix":unixdate,"utc":utcdate});
	} else{
	  let unixdate = dateparam;
	  let utcdate = new Date(dateparam * 1000);
	  utcdate = utcdate.toLocaleDateString("en-us",dateFormatOptions);
	  res.json({"unix":unixdate,"utc":utcdate});
	}

	

});



app.listen(PORT,()=>console.log(`Server listening to ${PORT}`));