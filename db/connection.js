const mongoose =require('mongoose');
const connectToMongo = async () => {
    try {
      const result=await mongoose.connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName:'taskdb'
      });
      if(result){
          console.log('Connected to Mongo Successfully');
      }else{
        console.log('mongodb connection problem')
      }
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
  
module.exports = connectToMongo;
  