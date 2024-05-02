
const userStatesSchema = new mongoose.Schema({
  userId: String,
  lms: {
    type: Map,
    of: new mongoose.Schema({
      reviewRecord: {
        correct: Number, // tapResult (can be empty string for QAs)
        incorrect: Number, // tapResult (can be empty string for QAs)
        skipped: Number, // tapResult (can be empty string for QAs)
        know: Number, // swipeResult
        dontKnow: Number, // swipeResult
        oneMore: Number, // swipeResult
        poorCard: Number, // swipeResult
      },
      alg: {
        prevInterval: Number,
        prevFactor: Number,
        nextReview: Number, // UNIX time in days
      },
    })
  }
}, { timestamps: true });

  try {
    if (conn == null) {
      conn = mongoose.createConnection(uri, {
        dbName: "ambientDev",
        serverSelectionTimeoutMS: 5000
      });

      await conn.asPromise();
      conn.model("UserStates", userStatesSchema, "userStates");
    }
    
    if (conn) {
      console.log("connected!");
    }
    
    const UserStates = conn.model("UserStates");
    
    // const userId = event.rawPath.split("/")[3];
    const userId = event.pathParameters.userId;
    // const lmId = event.rawPath.split("/")[4];
    const lmId = event.pathParameters.lmId;
    
    // data schema
    // { lm_id: String, latestRecord: { tapResult: String, swipeResult: String } }
    const data = JSON.parse(event.body);

    // Get user where userId matches.
    const userStateDoc = await UserStates.findOne({ userId: userId });
    const userLms = userStateDoc.lms;
    
    // Update review record with the given data.
    // userLms.get(lmId).reviewRecord = data.reviewRecord;
    const tapResultToUpdate = data.latestRecord.tapResult;
    const swipeResultToUpdate = data.latestRecord.swipeResult;
    
    if (tapResultToUpdate != "") {
      userLms.get(lmId).reviewRecord[tapResultToUpdate] += 1;
    }
    
    userLms.get(lmId).reviewRecord[swipeResultToUpdate] += 1;
    
    // Set next review date to null to mark as completed.
    
    // Algorithm
    let tempObj = userLms.get(lmId);
    if(swipeResultToUpdate === 'poorCard'){
      // Set the nextReview to be null if user swipes poorCard
      tempObj.alg.nextReview = null;
    }else{
      // Initialize the memory factor and interval based on previous value
      let memFactor = tempObj.alg.prevFactor;
      let interval = tempObj.alg.prevInterval;
      
      // Calculate the difference between number of Know and Don'tKnow
      const difference = tempObj.reviewRecord['know'] - tempObj.reviewRecord['dontKnow'];
      
      // Used to indicate if we need to update the factor/interval
      let updateParameters= true;
      
      // When the user swipes knowing the card
      if(swipeResultToUpdate === 'know'){
        memFactor += 0.09;
        
        // Decrement the factor if user answers it incorrectly
        if(tapResultToUpdate === 'incorrect'){
          memFactor -= 0.012;
        }
        // Decrement the factor if user skips answering mcq
        else if(tapResultToUpdate === 'skipped'){
          memFactor -= 0.01;
        }
        // If user's historical result indicates that he knows this relatively well
        if (difference >= 3 && interval === 1){
          // Increment interval and factor and set this as the end result by 
          // setting updateParameters to be false
          interval = 2 + difference;
          memFactor = Math.max(1.3, memFactor + difference * 0.12);
          updateParameters = false;
        }
      }
      // When the user swipes dont knowing the card
      else if(swipeResultToUpdate === 'dontKnow'){
        memFactor -= 0.03;
        if(difference >= 3 ){
          memFactor += 0.025;
        }
      }
      // When the user swipes oneMore
      else{
        memFactor -= 0.05;
      }
      
      // If we didn't finalize the factor and interval before
      if(updateParameters){
         memFactor = Math.max(1.3, memFactor);
        if(swipeResultToUpdate === 'dontKnow'){
          interval = 1;
        }else{
          interval = Math.ceil(interval * memFactor);
        }
      }
      tempObj.alg.prevFactor = memFactor;
      tempObj.alg.prevInterval = interval;
      tempObj.alg.nextReview += interval;
      
    }
    userLms.get(lmId).alg = tempObj.alg;
    
    
    const res = await UserStates.findOneAndUpdate({userId: userId }, { lms: userLms });
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(res),
    };
    return response;
    
    
  } catch (err) {
    console.log(err);
    const response = {
      statusCode: 500,
      body: JSON.stringify(`error: ${err}`),
    };
    return response;
  }
