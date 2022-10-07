import React, { useState } from "react";
import "./App.css";
import { Draggable } from "drag-react";
import { add, del } from "./store/homeSlice";
import { homeState } from "./store/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import image from "./photo/photo.jpg";
import { add1 } from "./store/mainSlice";
import { mainState } from "./store/mainSlice";

const App = () => {
  const [set, subset] = useState(false);

  const [down, setdown] = useState(false);

  const [init, setinit] = useState(false);

  const statedata = useSelector(homeState);

  const maindata = useSelector(mainState);

  let Type = statedata.map((val) => val.type);
  let Id = statedata.map((val) => val.id);
  let Placeholder = statedata.map((val) => val.placeholder);
  let ClassName = statedata.map((val) => val.classname);
  let Name = statedata.map((val) => val.name);

  const [input1, setinput1] = useState({
    type: "",
    id: "",
    placeholder: "",
    classname: "",
    name: "",
  });

  var dispatch = useDispatch();

  const handleClick = () => {
    subset(true);
  };

  const handleform = (e) => {
    e.preventDefault();
    setinput1({ ...input1, [e.target.name]: e.target.value });
  };

  const handledownload = () => {
    let value = statedata.map((val) => {
      return `<input type=${val.type} id=${val.id} placeholder=${val.placeholder} classname=${val.classname} name=${val.name}/>\n`;
    });
    let blob = new Blob([value], { type: "html/plain" });
    let file = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = file;
    a.handledownload = "data.html";
    a.click();
  };

  const handlealldownload = () => {
    let value = maindata.map((val) => {
      return `<input type=${val.type} id=${val.id} placeholder=${val.placeholder} classname=${val.classname} name=${val.name}/>\n`;
    });
    let blob = new Blob([value], { type: "plain/html" });
    let file = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = file;
    a.click();
  };

  const handelsubmit = () => {
    if (
      input1.type === "" ||
      input1.id === "" ||
      input1.placeholder === "" ||
      input1.classname === "" ||
      input1.name === ""
    ) {
      alert("please fill all details");
    } else {
      dispatch(add(input1));
      dispatch(add1(input1));
    }

    setinput1({
      type: "",
      id: "",
      placeholder: "",
      classname: "",
      name: "",
    });
  };

  const handlenew = () => {
    dispatch(del());
    setdown(true);
    setinit(true);
  };

  const handleallshow = () => {
    subset(false);
    setdown(false);
    setinit(false);
  };

  const inputdownload = (ind) => {
    let value = maindata.map((val) => {
      return `<input type=${val.type} id=${val.id} placeholder=${val.placeholder} classname=${val.classname} name=${val.name}/>\n`;
    });
    let blob = new Blob([value[ind]], { type: "plain/html" });
    let file = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = file;
    a.click();
  };

  return (
    <>
      <div className="header">
        <div className="main-input">
          <Draggable>
            <div className="inputfield" onDoubleClick={handleClick}>
              <input
                type={Type}
                id={Id}
                placeholder={Placeholder}
                className={ClassName}
                name={Name}
              />
            </div>
          </Draggable>
          <Draggable>
            <div className="updatedata" >
              {init &&
                maindata.map((data, index) => {
                  return (
                    <input
                      key={index}
                      type={data.type}
                      id={data.id}
                      placeholder={data.placeholder}
                      className={data.className}
                      name={data.name}
                    />
                  );
                })}
            </div>
          </Draggable>
        </div>
        <h1 className="drag-drop">Drag & Drop</h1>
        {set && (
          <div className="buttons">
            <button className="buttons1" onClick={handlenew}>
              New
            </button>

            <button className="buttons3" onClick={handledownload}>
              Download
            </button>

            {down && (
              <button className="buttons4" onClick={handlealldownload}>
                Download All {maindata.length}
              </button>
            )}
            {down && (
              <button className="buttons4" onClick={handleallshow}>
                Show All
              </button>
            )}
          </div>
        )}
      </div>
      {set || (
        <div className="Display">
          <div>
            <img className="image" src={image} alt="" />
          </div>
          <div className="selected">
            {maindata.map((data, index) => {
              return (
                <>
                  <input
                    key={index}
                    type={data.type}
                    id={data.id}
                    placeholder={data.placeholder}
                    className={data.className}
                    name={data.name}
                  />
                  <button
                    className="setbuttton"
                    onClick={() => inputdownload(index)}
                  >
                    download
                  </button>
                </>
              );
            })}
          </div>
        </div>
      )}

      {set && (
        <>
          <div className="Display">
            <div>
              <img className="image" src={image} alt="" />
            </div>
            <div className="selected">
              <form onSubmit={handleform}>
                <label>Type</label>
                <br />
                <input
                  type="text"
                  value={input1.type}
                  name="type"
                  onChange={handleform}
                />
                <br />
                <label>id</label>
                <br />
                <input
                  type="text"
                  value={input1.id}
                  name="id"
                  onChange={handleform}
                />
                <br />
                <label>Placeholder</label>
                <br />
                <input
                  type="text"
                  value={input1.placeholder}
                  name="placeholder"
                  onChange={handleform}
                />
                <br />
                <label>ClassName</label>
                <br />
                <input
                  type="text"
                  value={input1.classname}
                  name="classname"
                  onChange={handleform}
                />
                <br />
                <label>name</label>
                <br />
                <input
                  type="text"
                  value={input1.name}
                  name="name"
                  onChange={handleform}
                />
                <br />
                <input
                  type="submit"
                  className="buttons3"
                  onClick={handelsubmit}
                />
                <br />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;
