import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, getToDoList, addToDoItem, deleteToDoItem } from "../../utils/firebase/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";

const ToDoListHome = () => {
    const [user, loading, error] = useAuthState(auth);
    const [toDoItems, setToDoItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [refresh, setRefresh] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
    }, [user, loading]);

    useEffect(() => {
        if (!loading) {
            getToDoList(user.email).then((items) => setToDoItems(items));
        }
    }, [user, loading, newItem, refresh]);

    const handleAddNewItem = () => {
        addToDoItem(toDoItems, user.email, newItem);
        setNewItem("");
    };

    const handleDeleteItem = (deleteItem) => {
        deleteToDoItem(toDoItems, user.email, deleteItem);
        setRefresh(deleteItem);
    };

    return (
        <div>
            <h1>To-Do List</h1>

            {toDoItems && user ? (
                <table style={{
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(toDoItems) && (toDoItems.map((toDoItem, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{toDoItem}</td>

                                <td><button className="ms-1" variant='outline-danger' onClick={() => {handleDeleteItem(toDoItem)}}>x Delete</button>
                                </td>
                            </tr>
                        )))}
                            <tr>
                                <td>{"New"}</td>
                                <td>
                                    <input value={newItem} type="text" id="newItem" name="newItem" onChange={(e) => {setNewItem(e.target.value)}} />
                                </td>
                                <td><button 
                                    variant="light"
                                    onClick={handleAddNewItem}
                                    >Add New</button>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                </table>
            ) : <h1>Loading list</h1>}
        </div>
    );
};

export default ToDoListHome;