user={
    1000:{acno:1000,uname:"akhil",password:"userone",balance:3000,transaction:[]},
    1001:{acno:10001,uname:"anu",password:"usertwo",balance:3000,transaction:[]},
    1002:{acno:1002,uname:"aby",password:"userthree",balance:3000,transaction:[]},
    1003:{acno:1003,uname:"anna",password:"userfour",balance:3000,transaction:[]}
  }


const register = (acno,uname,password)=>{
    //console.log("register called")
    //return
     
   
 
    if(acno in user){
      
      return {
        statusCode:422,
        status: false,
        message:"User already exists!!!! please log in..."
      }

    }
    else{
      user[acno]={
        acno,
        uname,
        password,
        balance:0,
        transaction:[]
      }
      
      return {
        statusCode:200,
        status: true,
        message:"Register successfully"
      }
    }
 
   }


  const login = (acno,pswd)=>{

    
    if (acno in user ) {
      if (pswd == user[acno]["password"]) {
        currentUser = user[acno]["uname"]
        currentAcc=acno
        
        return {
          statusCode:200,
          status: true,
          message:"Successfully Log In"
        }

      }
      else {
        return {
          statusCode:422,
          status: false,
          message:"Incorrect Password"
        }
      }
    }
    else {
      return {
        statusCode:422,
        status: false,
        message:"Invalid User"
      }
    }

  }



  const deposite = (acno,pswd,amt)=>{

    var amount = parseInt(amt)
 
     if(acno in user){
      if(pswd == user[acno]["password"]){
        user[acno]["balance"]+=amount
        user[acno].transaction.push({
          amount:amount,
          type:"CREDIT"
        })
       
   
        return {
          statusCode:200,
          status: true,
          message: amount + " Deposited Successfully and new balance is: " + user[acno]["balance"]
        }
      }
      else{
        return {
          statusCode:422,
          status: false,
          message:"Incorrect Password"
        }
      }
     }
    
    else{
      return {
        statusCode:422,
        status: false,
        message:"Invalid User"
      }
    }
 
   }


   const withdraw = (acno,pswd,amt)=>{

    var amount = parseInt(amt)
 
    if(acno in user){
      if(pswd == user[acno]["password"]){
        if(user[acno]["balance"]>amount){

      
          user[acno]["balance"]-=amount
     
          user[acno].transaction.push({
          amount:amount,
          type:"DEBIT"
        })

       
        
        return {
          statusCode:200,
          status: true,
          message: amount + " Debited Successfully and new balance is: " + user[acno]["balance"]
        }
        }
        else{
          
          return {
            statusCode:422,
            status: false,
            message:" Insufficient balance"
          }
        }
      }
      else{
        return {
          statusCode:422,
          status: false,
          message:"Incorrect Password"
        }
      }
     }
    
    else{
      return {
        statusCode:422,
        status: false,
        message:"Invalid Account"
      }
    }
 
   }


   module.exports={
    register,
    login,
    deposite,
    withdraw
   }