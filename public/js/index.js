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
      const index = list.findIndex(list => {
        return list.id === edit.id;
      });

      // membaut clone list
      const cloneList = [...list];
      const temp = {
        ...edit,
        activity,
        done: cloneList[index].done
      };
      cloneList[index] = temp;
      setList(cloneList);
      setEmpty();
      return;
    }
    const tempList = [...list, {
      id: Date.now(),
      activity,
      done: false
    }];
    setList(tempList);
    setEmpty();
    return;
  }
  function deleteActivity(id) {
    const tempList = list.filter(l => l.id !== id);
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
      done: oneList.done ? false : true
    };
    const tempList = [...list];
    const index = list.findIndex(list => list.id === oneList.id);
    tempList[index] = temp;
    setList(tempList);
  }
  function setCheckbox() {
    const index = list.findIndex(list => {
      return list.id === edit.id;
    });

    // membaut clone list
    const cloneList = [...list];
    const temp = {
      ...edit,
      done: edit.done
    };
    cloneList[index] = temp;
    setList(cloneList);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    className: "img-fluid d-block mx-auto my-3",
    src: "../img/onePiece.png",
    style: {
      width: 300
    }
  }), err && /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger",
    role: "alert"
  }, "Cannot Submit Empty Text!"), /*#__PURE__*/React.createElement("form", {
    className: "input-group mb-3",
    onSubmit: actionToList
  }, /*#__PURE__*/React.createElement("input", {
    value: activity,
    onChange: function (event) {
      setActivity(event.target.value);
    },
    type: "text",
    className: "form-control"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-secondary",
    type: "submit"
  }, edit.id ? "Save" : "Add"), edit.id && /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setCheckbox();
      setEmpty();
    },
    className: "btn btn-outline-secondary",
    type: "submit"
  }, "Cancel")), list.length < 1 ? /*#__PURE__*/React.createElement("div", {
    className: "alert alert-dark",
    role: "alert"
  }, "No Activity") : /*#__PURE__*/React.createElement("ul", {
    className: "list-group"
  }, list.map(function (list) {
    return /*#__PURE__*/React.createElement("li", {
      key: list.id,
      className: "list-group-item d-flex justify-content-between align-items-center"
    }, list.activity, /*#__PURE__*/React.createElement("button", {
      onClick: deleteActivity.bind(this, list.id),
      className: "btn btn-outline-secondary mx-3",
      type: "button"
    }, "Delete"), /*#__PURE__*/React.createElement("button", {
      onClick: editOneList.bind(this, list),
      className: "btn btn-outline-secondary",
      type: "button"
    }, "Edit"), /*#__PURE__*/React.createElement("span", {
      className: "form-check"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-check-label"
    }, list.done ? "Finished" : "Unfinished", /*#__PURE__*/React.createElement("input", {
      onChange: setDone.bind(this, list),
      className: "form-check-input",
      type: "checkbox",
      checked: list.done
    }))));
  })));
};
root.render( /*#__PURE__*/React.createElement(Element, null));