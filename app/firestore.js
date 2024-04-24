import { db } from "@/app/firebase";
import {
    collection,
    getDocs,
    addDoc,
    query,
    doc,
    deleteDoc,
    where,
  } from "firebase/firestore";

  export async function getPoll(userId) {
    const polls = [];
    const q = query(collection(db, `users/${userId}/polls`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      polls.push(doc.data());
    });
  
    return polls;
  }


  
  export async function addPoll(userId, poll) {
    const docRef = await addDoc(collection(db, `users/${userId}/polls`), {
      Id: poll.Id,
      question: poll.question,
      option1: poll.option1,
      option2: poll.option2,
      EndTime: poll.EndTime
    });
    const docRef1 = await addDoc(collection(db, `polls/`), {
      Id: poll.Id,
      question: poll.question,
      option1: poll.option1,
      option2: poll.option2,
      EndTime: poll.EndTime
    });
  }
  
  export async function deletePoll(userId, fieldId) {
    const itemsRef = collection(db, `users/${userId}/polls`);
    const q = query(itemsRef, where("Id", "==", fieldId));

    const itemRef1 = collection(db, `polls/`);
    const q1 = query(itemRef1, where("Id", "==", fieldId));


    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // Assuming only one document will match, proceed to delete it
        querySnapshot.forEach(async (document) => {
          await deleteDoc(document.ref);
          console.log(`Document deleted successfully`);
        });
      } else {
        console.log("No document matches the specified id.");
      }
      const querySnap = await getDoc(q1);
      if(!querySnap.empty){
        querySnap.forEach(async (doc1) => {
          await deleteDoc(doc1.ref)
        })
      }
    } catch (error) {
      console.error("Error deleting document by id:", error);
    }
  }
