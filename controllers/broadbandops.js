const BroadbandPayHistory = require("../models/broadbandpayhistory")
const BroadbandRequest = require("../models/broadbandbuyrequest")
const Broadband = require("../models/broadband");

//Buy BroadBandPlan
exports.buynewbroadband = (req,res) =>{
    var amountcalc;
    //Amount Calculation
    amountcalc = req.body.broadband.monthlyprice + req.body.broadband.installationcharges;
    
    var request = new BroadbandRequest({
        "user" : req.body.user._id,
        "broadband" : req.body.broadband._id,
        "address" : req.body.address,
        "amount" : amountcalc,
        "plantype" : req.body.broadband.plantype,
        "dueamount" :0,
        "planduration" : req.body.broadband.validity,
        "plandata" : req.body.broadband.data
    })

    request.save((err,data)=>{
        if(err){
            return res.status(404).json({
                error : "Buy broadband request failed"
            })
        }
        data.paymentlink = "https://paytm.com" //make it configurable
        data.callbackUrl = "/broadbandpaymentres" /// frontend Route that will reroute to another function
        res.json(data);
    })
}

//Payment Gateway returned result 
exports.broadbandplandpayment =(req,res)=>{
    if(req.body.paymentstatus === false){
        BroadbandRequest.findOneAndUpdate(
            {_id : req.body._id},
            {$set : {
                status : "Failed",
                error : req.body.error
            }},
            {new: true},
            (err,paymentdet)=>{
                if(err){
                    return res.status(404).json({
                        error : "Payment failed"
                    })
                }
                res.json({
                    message :"Payment failed, if amount is debited from your account it will be rolled backed soon"
                })
            }
        )
    }else{
        BroadbandRequest.findOneAndUpdate(
            {_id : req.body._id},
            {$set : {
                status : "Success",
                transactionrefno : req.body.referenceno
            }},
            {new: true},
            (err,paymentdet)=>{
                if(err){
                    return res.status(404).json({
                        error : "Failed to stored payment result"
                    })
                }
                
                //Adding details in Payment History Data
                var objarr =[];
                var date = new Date(new Date().toDateString());
                //PostPaid Functionality Remaining
                var prepaidObj = new BroadbandPayHistory({
                    "userId" : paymentdet.user,
                    "productId" : paymentdet.broadband,
                    "plantype" : paymentdet.plantype,
                    "planfrom" : date,
                    "plantill" : new Date(date.getTime()+(parseInt(paymentdet.planduration)*24*60*60*1000)),
                    "referenceno" : paymentdet.transactionrefno,
                    "paymentstatus": "Paid",
                    "amount" : paymentdet.amount,
                    "status" : "active",
                    "isupgrade" : 0,
                    "usage" :  paymentdet.plandata+"|"  ///75 total data  75|5 means 70GB Data remaining first day consumption 5
                })
                objarr.push(prepaidObj);
                
                objarr.forEach(element => {
                    element.save((err,result)=>{
                        if(err){
                            return res.status(404).json({
                                message : "User Paid for scheme, Some Error occured in backoffice"
                            })
                        }
                    })
                });
                res.json(paymentdet);
        })
    }
}


//Broadband Upgrade or Renew
exports.BroadbandRenewalUpgradeRequest =(req,res)=>{
    //currentplan object will be of broadbandpayhistorytype
    var currentplan = req.body.currentplan;
    var newplan = req.body.newplan; //if Upgraded
    Broadband.find({_id : currentplan.productId}).exec((err,plans)=>{
        if(err || plans.length ==0){
            return res.status(404).json({
                error : "No Plan Found"
            })
        }
        var request = new BroadbandRequest({
            "user" : currentplan.userId,
            "broadband" : (newplan === undefined || newplan === null)? currentplan.productId :newplan._id,
            "existingplanId" : currentplan._id,
            "address" : req.body.address,
            "amount" : (newplan === undefined || newplan === null)?(plans[0].monthlyprice):newplan.monthlyprice,  ///if admin upgraded price afterwords then needs to be modified
            "plantype" : newplan.plantype,
            "isupgrade" : (newplan === undefined || newplan === null)?0:1,
            "planduration" : (newplan === undefined || newplan === null)?plans[0].validity : newplan.validity
        })
        request.save((err,data)=>{
            if(err){
                return res.status(404).json({
                    error : "Buy broadband request failed"
                })
            }
            data.paymentlink = "https://paytm.com" //make it configurable
            data.callbackUrl = "/broadbandpaymentrenewalres" /// frontend ROute that will reroute to another function
            res.json(data);
        })
    })
}

//Returened from Payment Gateway
exports.BroadbandPlanRenewalUpgrade =(req,res)=>{
    //payment failed
    if(req.body.paymentstatus === false){
        BroadbandRequest.findOneAndUpdate(
            {_id : req.body._id},
            {$set : {
                status : "Failed",
                error : req.body.error
            }},
            {new: true},
            (err,paymentdet)=>{
                if(err){
                    return res.status(404).json({
                        error : "Payment failed"
                    })
                }
                res.json({
                    message :"Payment failed, if amount is debited from your account it will be rolled backed soon"
                })
            }
        )
    }else{
        //payment success
        BroadbandRequest.findOneAndUpdate(
            {_id : req.body._id},
            {$set : {
                status : "Success",
                transactionrefno : req.body.referenceno
            }},
            {new: true},
            (err,paymentdet)=>{
                if(err){
                    return res.status(404).json({
                        error : "Failed to stored payment result"
                    })
                }
                //get PaymentHistory details
                ///Check for Due date of existing plan first
                Broadbandpayhistory.find({_id : paymentdet.existingplanId}).exec((err,plans)=>{
                    var date;
                    var updateobj;
                    if(plans.plantill.getTime() < new Date(new Date().toDateString()).getTime()){
                        //After Plan Expiry
                        date = new Date(new Date().toDateString());
                        //handling closing active plans
                        updateobj = {
                            status : "closed",
                        }
                    }else{
                        //before plan expiry
                        date = new Date(plans.plantill.getTime() + (1*24*60*60*1000));
                        //added 1 day after plan ends
                        updateobj = {
                            isupgrade : 1,
                        }
                    }
                    BroadbandPayHistory.findOneAndUpdate(
                        {_id : paymentdet.existingplanId},
                        {$set : updateobj},
                        {new: true},
                        (err,plans)=>{
                            if(err){
                                return res.status(404).json({
                                    message : "User Paid for scheme, Some Error occured in backoffice"
                                })
                            }
                        })


                    var prepaidObj = new BroadbandPayHistory({
                        "userId" : paymentdet.user,
                        "productId" : paymentdet.broadband,
                        "plantype" : paymentdet.plantype,
                        "planfrom" : date,
                        "plantill" : new Date(date.getTime()+(parseInt(paymentdet.planduration)*24*60*60*1000)),  //bydefault 30 days added
                        "referenceno" : paymentdet.transactionrefno,
                        "paymentstatus": "Paid",
                        "amount" : paymentdet.amount,
                        "status" : "active",
                        "isupgrade" : 0,
                        "usage" :  paymentdet.plandata+"|" 
                    })
                    prepaidObj.save((err,result)=>{
                        if(err){
                            return res.status(404).json({
                                message : "User Paid for scheme, Some Error occured in backoffice"
                            })
                        }
                    })
                    res.json(paymentdet);
                })
            })
        }
}

//Get BroadBandCurrent plan
exports.getCurrentBroadbandPlan = (req,res)=>{
    BroadbandPayHistory.find({user : req.profile._id, status: "active"}).exec((err,plans)=>{
        if(err){
            return res.status(404).json({
                error : "Error While getting current plan of user"
            })
        }
        res.json(plans);  ///2 Plans will be populated if renewed before expiry
    })
}


//Get Broadband payment success history
exports.getBroadbandPaymentHistory =(req,res)=>{
    BroadbandPayHistory.find({user : req.profile._id}).exec((err,plans)=>{
        if(err){
            return res.status(404).json({
                error : "Error While getting current plan of user"
            })
        }
        res.json(plans);
    })
}
    

