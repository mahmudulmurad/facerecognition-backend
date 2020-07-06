const Clarifai =require('clarifai');
const app = new Clarifai.App({apiKey: '970e9075b8ac472ea34e44d1a09071a3'});

 const handleApiCall=(req,res)=>{
 	app.models.
 	predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
 	.then(data=>{
 		res.json(data);
 	})
 	.catch(err=>res.status(400).json('failed api'))
 }

const handleImage=(req,res,db)=>{
	const { id }=req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries=>{
		res.json(entries);
	})
	.catch(err=>res.status(400).json('unable to response'))
}
module.exports={
	handleImage,
	handleApiCall
}