import { Col, Layout, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const { Content } = Layout;

const Projects = () => {
  const [display, setDisplay] = useState(false);
  const [active, setActive] = useState("");
  const [tableDataTodo, setTableDataTodo] = useState([
    {
      title: "To do",
      data: [],
    },
  ]);
  const [tableDataProgress, setTableDataProgress] = useState([
    {
      title: "Progress",
      data: [],
    },
  ]);
  const [tableDataCom, setTableDataCom] = useState([
    {
      title: "Completed",
      data: [],
    },
  ]);

  const [titleData, setTitleData] = useState("");
  const [descriptionData, setDescriptionData] = useState("");

  //Beautiful Dnd
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceColumn = result.source.droppableId;
    const destinationColumn = result.destination.droppableId;

    // Logic to handle task movement between columns
    if (sourceColumn === "todo" && destinationColumn === "progress") {
      // Move task from To Do to Progress
      const task = tableDataTodo[result.source.index];
      setTableDataTodo((prevData) => {
        const newData = [...prevData];
        newData.splice(result.source.index, 1);
        setTableDataProgress([...tableDataProgress, task]);
        return newData;
      });
    } else if (sourceColumn === "progress" && destinationColumn === "todo") {
      // Move task from Progress to To Do
      const task = tableDataProgress[result.source.index];
      setTableDataProgress((prevData) => {
        const newData = [...prevData];
        newData.splice(result.source.index, 1);
        setTableDataTodo([...tableDataTodo, task]);
        return newData;
      });
    }
  };

  const handleAdd = (title, index) => {
    const newTask = {
      title: titleData,
      heading: descriptionData,
    };

    // const stageIndex = index;
    const tableData =
      title === "To do"
        ? tableDataTodo
        : title === "Progress"
        ? tableDataProgress
        : tableDataCom;

    const updatedTableData = [...tableData];
    updatedTableData[index]?.data?.push(newTask);

    //here give the condition
    if (title === "To do") {
      setTableDataTodo(updatedTableData);
      localStorage.setItem("tableDataTodo", JSON.stringify(updatedTableData));
    } else if (title === "Progress") {
      setTableDataProgress(updatedTableData);
      localStorage.setItem(
        "tableDataProgress",
        JSON.stringify(updatedTableData)
      );
    } else {
      setTableDataCom(updatedTableData);
      localStorage.setItem("tableDataCom", JSON.stringify(updatedTableData));
    }

    // setTableData(updatedTableData);

    setTitleData("");
    setDescriptionData("");
    setActive("");
    setDisplay(false);
  };

  useEffect(() => {
    const storedDataTodo = localStorage.getItem("tableDataTodo");
    const storedDataProgress = localStorage.getItem("tableDataProgress");
    const storedDataCom = localStorage.getItem("tableDataCom");

    if (storedDataTodo) {
      setTableDataTodo(JSON.parse(storedDataTodo));
    }
    if (storedDataProgress) {
      setTableDataProgress(JSON.parse(storedDataProgress));
    }
    if (storedDataCom) {
      setTableDataCom(JSON.parse(storedDataCom));
    }
  }, []);

  // console.log(tableData);
  //Here we have to make data for reusable component
  // let tableData = [
  //   {
  //     title: "To do",
  //     data: [
  //       {
  //         title: "Design- App",
  //         heading:
  //           "Modifying Career, Scholarship and Entrance exam screen Acc to new design pattern",
  //       },
  //       {
  //         title: "Prototyping",
  //         heading: "Account -> Profile Section",
  //       },
  //       {
  //         title: "Frontend",
  //         heading:
  //           "Modifying Career, Scholarship and Entrance exam screen Acc to new design pattern",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Progress",
  //     data: [
  //       {
  //         title: "Frontend",
  //         heading:
  //           "Modifying Career, Scholarship and Entrance exam screen Acc to new design pattern",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Completed",
  //     data: [
  //       {
  //         title: "Design- App",
  //         heading:
  //           "Modifying Career, Scholarship and Entrance exam screen Acc to new design pattern",
  //       },
  //       {
  //         title: "Prototyping",
  //         heading: "Account -> Profile Section",
  //       },
  //       {
  //         title: "Frontend",
  //         heading:
  //           "Modifying Career, Scholarship and Entrance exam screen Acc to new design pattern",
  //       },
  //     ],
  //   },
  // ];

  return (
    <div>
      {/* Upper Heading */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/images/search.png"
            alt="search"
            className="w-[17px] h-[17px] flex justify-center text-[#9A9A9A]"
          />
          <input className="text-[#9A9A9A] text-[17px] font-normal p-2 "  placeholder="Search..."/>
            
         
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-2">
            <Typography className="text-[#3A3A3A] font-medium text-[17px] ">
              Hi {localStorage.getItem("name")}
            </Typography>
            <img
              src="/images/profile.png"
              alt="profileImage"
              className="w-[45px] h-[45px]"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center ">
          <Typography className="font-medium text-2xl">Projects</Typography>
          <div className="flex gap-2">
            <img src="/images/bi_filter.jpg" alt="filter" />
            <Typography className="text-[17px] font-normal font-poppins ">
              Filter
            </Typography>
          </div>
        </div>
      </div>

      {/* Make three cards */}

      <Row className="mt-8" gutter={[16, 16]}>
        {tableDataTodo?.map((el, key) => (
          <Col span={8} className="w-318 h-[720px] flex-shrink-0  " key={key}>
            <div className="p-4 bg-[#F5F9F9] rounded-[15px]">
              <div className="flex justify-between">
                <Typography className="text-[#212121] text-sm  font-medium font-poppins mb-4">
                  {el?.title}
                </Typography>
                <Typography>{el.data.length}</Typography>
              </div>

              <button
                className="w-[100%] h-[38px] text-sm text-[#329C89] flex-shrink-0 rounded-[7px] align-middle bg-[#ECF3F3] justify-center  items-center  bg-ecf3f3 border-none outline-none cursor-pointer"
                onClick={() => setActive(el?.title)}
              >
                Add
              </button>

              {/* Here we have to make components */}
              {active === el?.title && (
                <div className="w-281.781 h-169.069 flex-shrink-0 rounded-7 bg-white shadow-md mt-8 ">
                  <div className="p-4">
                    <div className="flex justify-between">
                      <input
                        className="text-[#6B6B6B] text-sm  font-medium font-poppins mb-2 border border-none p-3"
                        placeholder="Give your task a title"
                        onChange={(e) => setTitleData(e.target.value)}
                      />

                      <div className="flex items-center gap-2 ">
                        <button
                          className="text-sm  font-medium "
                          onClick={() => handleAdd("To do", 0)}
                        >
                          Add
                        </button>

                        {/* <button className="text-sm text-[red] font-medium "  >Delete</button> */}
                      </div>
                    </div>

                    <input
                      className="text-[#6B6B6B] text-xs font-normal mb-2  p-2 "
                      placeholder=" Description..."
                      onChange={(e) => setDescriptionData(e.target.value)}
                    />

                    <div className="flex justify-between mt-6">
                      <img
                        src="/images/user.png"
                        alt="user"
                        className="w-[25px]"
                      />
                      <img
                        src="/images/comment.png"
                        alt="comment"
                        className="w-5"
                      />
                    </div>
                  </div>
                </div>
              )}

              {el?.data?.map((e) => (
                <div className="w-281.781 h-169.069 flex-shrink-0 rounded-7 bg-white shadow-md mt-8 ">
                  <div className="p-4">
                    <Typography className="text-[#212121] text-sm  font-medium font-poppins mb-2">
                      {e?.title}
                    </Typography>
                    <Typography className="text-[#6B6B6B] text-xs font-normal">
                      {e?.heading}
                    </Typography>

                    <div className="flex justify-between mt-6">
                      <img
                        src="/images/user.png"
                        alt="user"
                        className="w-[25px]"
                      />
                      <img
                        src="/images/comment.png"
                        alt="comment"
                        className="w-5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        ))}
        {tableDataProgress?.map((el, key) => (
          <Col span={8} className="w-318 h-[720px] flex-shrink-0  " key={key}>
            <div className="p-4 bg-[#F5F9F9] rounded-[15px]">
              <div className="flex justify-between">
                <Typography className="text-[#212121] text-sm  font-medium font-poppins mb-4">
                  {el?.title}
                  {/* {console.log(el,"dataaaa")} */}
                </Typography>
                <Typography>{el.data.length}</Typography>
              </div>

              <button
                className="w-[100%] h-[38px] text-sm text-[#329C89] flex-shrink-0 rounded-[7px] align-middle bg-[#ECF3F3] justify-center  items-center  bg-ecf3f3 border-none outline-none cursor-pointer"
                onClick={() => setActive(el?.title)}
              >
                Add
              </button>

              {/* Here we have to make components */}
              {active === el?.title && (
                <div className="w-281.781 h-169.069 flex-shrink-0 rounded-7 bg-white shadow-md mt-8 ">
                  <div className="p-4">
                    <div className="flex justify-between">
                      <input
                        className="text-[#6B6B6B] text-sm  font-medium font-poppins mb-2 border border-none p-3"
                        placeholder="Give your task a title"
                        onChange={(e) => setTitleData(e.target.value)}
                      />

                      <div className="flex items-center gap-2 ">
                        <button
                          className="text-sm  font-medium "
                          onClick={() => handleAdd("Progress", key)}
                        >
                          Add
                        </button>

                        {/* <button className="text-sm text-[red] font-medium "  >Delete</button> */}
                      </div>
                    </div>

                    <input
                      className="text-[#6B6B6B] text-xs font-normal mb-2  p-2 "
                      placeholder=" Description..."
                      onChange={(e) => setDescriptionData(e.target.value)}
                    />

                    <div className="flex justify-between mt-6">
                      <img
                        src="/images/user.png"
                        alt="user"
                        className="w-[25px]"
                      />
                      <img
                        src="/images/comment.png"
                        alt="comment"
                        className="w-5"
                      />
                    </div>
                  </div>
                </div>
              )}

              {el?.data?.map((e) => (
                <div className="w-281.781 h-169.069 flex-shrink-0 rounded-7 bg-white shadow-md mt-8 ">
                  <div className="p-4">
                    <Typography className="text-[#212121] text-sm  font-medium font-poppins mb-2">
                      {e?.title}
                    </Typography>
                    <Typography className="text-[#6B6B6B] text-xs font-normal">
                      {e?.heading}
                    </Typography>

                    <div className="flex justify-between mt-6">
                      <img
                        src="/images/user.png"
                        alt="user"
                        className="w-[25px]"
                      />
                      <img
                        src="/images/comment.png"
                        alt="comment"
                        className="w-5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        ))}
        {tableDataCom?.map((el, key) => (
          <Col span={8} className="w-318 h-[720px] flex-shrink-0  " key={key}>
            <div className="p-4 bg-[#F5F9F9] rounded-[15px]">
              <div className="flex justify-between">
                <Typography className="text-[#212121] text-sm  font-medium font-poppins mb-4">
                  {el?.title}
                  {/* {console.log(el,"dataaaa")} */}
                </Typography>
                <Typography>{el.data.length}</Typography>
              </div>

              <button
                className="w-[100%] h-[38px] text-sm text-[#329C89] flex-shrink-0 rounded-[7px] align-middle bg-[#ECF3F3] justify-center  items-center  bg-ecf3f3 border-none outline-none cursor-pointer"
                onClick={() => setActive(el?.title)}
              >
                Add
              </button>

              {/* Here we have to make components */}
              {active === el?.title && (
                <div className="w-281.781 h-169.069 flex-shrink-0 rounded-7 bg-white shadow-md mt-8 ">
                  <div className="p-4">
                    <div className="flex justify-between">
                      <input
                        className="text-[#6B6B6B] text-sm  font-medium font-poppins mb-2 border border-none p-3"
                        placeholder="Give your task a title"
                        onChange={(e) => setTitleData(e.target.value)}
                      />

                      <div className="flex items-center gap-2 ">
                        <button
                          className="text-sm  font-medium "
                          onClick={() => handleAdd("Completed", key)}
                        >
                          Add
                        </button>

                        {/* <button className="text-sm text-[red] font-medium "  >Delete</button> */}
                      </div>
                    </div>

                    <input
                      className="text-[#6B6B6B] text-xs font-normal mb-2  p-2 "
                      placeholder=" Description..."
                      onChange={(e) => setDescriptionData(e.target.value)}
                    />

                    <div className="flex justify-between mt-6">
                      <img
                        src="/images/user.png"
                        alt="user"
                        className="w-[25px]"
                      />
                      <img
                        src="/images/comment.png"
                        alt="comment"
                        className="w-5"
                      />
                    </div>
                  </div>
                </div>
              )}

              {el?.data?.map((e) => (
                <div className="w-281.781 h-169.069 flex-shrink-0 rounded-7 bg-white shadow-md mt-8 ">
                  <div className="p-4">
                    <Typography className="text-[#212121] text-sm  font-medium font-poppins mb-2">
                      {e?.title}
                    </Typography>
                    <Typography className="text-[#6B6B6B] text-xs font-normal">
                      {e?.heading}
                    </Typography>

                    <div className="flex justify-between mt-6">
                      <img
                        src="/images/user.png"
                        alt="user"
                        className="w-[25px]"
                      />
                      <img
                        src="/images/comment.png"
                        alt="comment"
                        className="w-5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Projects;
