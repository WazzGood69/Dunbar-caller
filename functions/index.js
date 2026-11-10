const {onCall,HttpsError}=require("firebase-functions/v2/https");
const {initializeApp}=require("firebase-admin/app");
const {getFirestore,FieldValue,Timestamp}=require("firebase-admin/firestore");
const crypto=require("crypto");
initializeApp();const db=getFirestore();
const normalize=v=>"+"+String(v||"").replace(/\D/g,"");
const hash=v=>crypto.createHash("sha256").update(v).digest("hex");
exports.registerVerifiedPhone=onCall(async req=>{
 if(!req.auth)throw new HttpsError("unauthenticated","Sign in first.");
 const phone=normalize(req.auth.token.phone_number||"");
 if(phone.length<9)throw new HttpsError("failed-precondition","Verified phone required.");
 const uid=req.auth.uid,profile=await db.collection("users").doc(uid).get();
 if(!profile.exists)throw new HttpsError("failed-precondition","Create profile first.");
 const ref=db.collection("phoneIndex").doc(hash(phone));
 await db.runTransaction(async tx=>{const old=await tx.get(ref);if(old.exists&&old.data().uid!==uid)throw new HttpsError("already-exists","Number already linked.");tx.set(ref,{uid,createdAt:FieldValue.serverTimestamp()});});
 return {ok:true};
});
exports.lookupByVerifiedPhone=onCall(async req=>{
 if(!req.auth)throw new HttpsError("unauthenticated","Sign in first.");
 const phone=normalize(req.data?.phone);if(phone.length<9||phone.length>16)throw new HttpsError("invalid-argument","Enter full number with country code.");
 const uid=req.auth.uid,lim=db.collection("phoneLookupLimits").doc(uid),now=Date.now();
 await db.runTransaction(async tx=>{const s=await tx.get(lim),d=s.exists?s.data():{},start=d.windowStart?.toMillis?.()||0,count=start>now-900000?(d.count||0):0;if(count>=15)throw new HttpsError("resource-exhausted","Too many searches. Try later.");tx.set(lim,{windowStart:count?d.windowStart:Timestamp.fromMillis(now),count:count+1});});
 const hit=await db.collection("phoneIndex").doc(hash(phone)).get();if(!hit.exists||hit.data().uid===uid)return {found:false};
 const p=await db.collection("users").doc(hit.data().uid).get();if(!p.exists)return {found:false};
 return {uid:p.data().uid,displayName:p.data().displayName,username:p.data().username};
});