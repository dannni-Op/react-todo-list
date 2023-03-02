const root = ReactDOM.createRoot(document.getElementById("root"));

const Element = () => {
  //state activity
  const [activity, setActivity] = React.useState("");
  const [list, setList] = React.useState([]);
  const [edit, setEdit] = React.useState({});
  const [err, setErr] = React.useState(false);

  // React.useEffect(
  //   function () {
  //   },
  //   []
  // );

  // function tambah list
  function actionToList(event) {
    event.preventDefault();

    // kondisi saat form kurang dari 1
    if (activity.length < 1) {
      return setErr(true);
    }

    // saat mode edit tombol diclick
    if (edit.id) {
      // mencari index activity yang akan diupdate
      const index = list.findIndex((list) => {
        return list.id === edit.id;
      });

      // membaut clone list
      const cloneList = [...list];

      const temp = {
        ...edit,
        activity,
        done: cloneList[index].done,
      };

      cloneList[index] = temp;
      setList(cloneList);

      setEmpty();
      return;
    }

    const tempList = [
      ...list,
      {
        id: Date.now(),
        activity,
        done: false,
      },
    ];

    setList(tempList);
    setEmpty();
    return;
  }

  function deleteActivity(id) {
    const tempList = list.filter((l) => l.id !== id);
    setList(tempList);
    setEmpty();
  }

  function editOneList(oneList) {
    setActivity(oneList.activity);
    setEdit(oneList);
  }

  function setEmpty() {
    setActivity("");
    setEdit({});
    setErr(false);
  }

  function setDone(oneList) {
    const temp = {
      ...oneList,
      done: oneList.done ? false : true,
    };

    const tempList = [...list];
    const index = list.findIndex((list) => list.id === oneList.id);

    tempList[index] = temp;
    setList(tempList);
  }

  function setCheckbox() {
    const index = list.findIndex((list) => {
      return list.id === edit.id;
    });

    // membaut clone list
    const cloneList = [...list];

    const temp = {
      ...edit,
      done: edit.done,
    };

    cloneList[index] = temp;
    setList(cloneList);
  }

  return (
    <>
      <img
        className="img-fluid d-block mx-auto my-3"
        src="../img/onePiece.png"
        style={{
          width: 300,
        }}
      ></img>
      {err && (
        <div className="alert alert-danger" role="alert">
          Cannot Submit Empty Text!
        </div>
      )}

      <form className="input-group mb-3" onSubmit={actionToList}>
        <input
          value={activity}
          onChange={function (event) {
            setActivity(event.target.value);
          }}
          type="text"
          className="form-control"
        />
        <button className="btn btn-outline-secondary" type="submit">
          {edit.id ? "Save" : "Add"}
        </button>
        {edit.id && (
          <button
            onClick={function () {
              setCheckbox();
              setEmpty();
            }}
            className="btn btn-outline-secondary"
            type="submit"
          >
            Cancel
          </button>
        )}
      </form>

      {list.length < 1 ? (
        <div className="alert alert-dark" role="alert">
          No Activity
        </div>
      ) : (
        <ul className="list-group">
          {list.map(function (list) {
            return (
              <li
                key={list.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {list.activity}
                <button
                  onClick={deleteActivity.bind(this, list.id)}
                  className="btn btn-outline-secondary mx-3"
                  type="button"
                >
                  Delete
                </button>
                <button
                  onClick={editOneList.bind(this, list)}
                  className="btn btn-outline-secondary"
                  type="button"
                >
                  Edit
                </button>
                <span className="form-check">
                  <label className="form-check-label">
                    {list.done ? "Finished" : "Unfinished"}
                    <input
                      onChange={setDone.bind(this, list)}
                      className="form-check-input"
                      type="checkbox"
                      checked={list.done}
                    />
                  </label>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

root.render(<Element />);
