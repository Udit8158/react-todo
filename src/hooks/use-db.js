import { useContext, useState } from "react";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../context/auth-context";
import { db } from "../firebase";
const useDb = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  const authCtx = useContext(AuthContext);
  const uuid = authCtx.uuid;

  const docRef = doc(db, "users", uuid);

  // Function for getting data
  const getData = async () => {
    try {
      setLoading(true);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const todos = docSnap.data().todos;
        setData(todos);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      setLoading(false);
      setError(null);
    } catch (e) {
      setLoading(false);
      console.log(e.msg);
      setError("Some thing went wrong");
      setShowBanner(true);

      setTimeout(() => {
        setShowBanner(false);
      }, 3000);
    }
  };

  // Funciton for setting and updating data
  const sendData = async (todoText) => {
    // console.log(data);
    try {
      // await getData();
      setLoading(true);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // update the collection in db when collection is allready created
        await updateDoc(docRef, {
          todos: [
            ...data,
            { todo: todoText, isCompleted: false, id: Math.random() },
          ],
        });
      } else {
        // when creation of collection in db (for the first time)
        await setDoc(docRef, {
          todos: [
            ...data,
            { todo: todoText, isCompleted: false, id: Math.random() },
          ],
        });
      }
      await getData();
      setError(null);
    } catch (e) {
      setLoading(false);
      console.error("Error adding document: ", e);
      setError("Something went wrong");

      setShowBanner(true);

      setTimeout(() => {
        setShowBanner(false);
      }, 3000);
    }
  };

  // function for toggling todo
  const toggle = async (id) => {
    //await getData();
    const markedTodo = data.find((todo) => todo.id === id);
    markedTodo.isCompleted = !markedTodo.isCompleted;

    // update the db
    await updateDoc(docRef, {
      todos: data,
    });
  };

  // function for deleting todo
  const deleteTodo = async (id) => {
    const filteredData = data.filter((todo) => todo.id !== id);
    console.log(filteredData);
    setData(filteredData);

    // update the db
    await updateDoc(docRef, {
      todos: filteredData,
    });
  };
  // Returng useful things
  return {
    todos: data,
    loading,
    setLoading,
    getData,
    sendData,
    toggle,
    deleteTodo,
    error,
    showBanner,
  };
};

export default useDb;
