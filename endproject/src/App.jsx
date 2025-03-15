import React, { useState } from "react";
import "./App.css"; // Import file CSS

export default function TodoTabs() {
  // Quản lý tab hiện tại (all, active, completed)
  const [currentTab, setCurrentTab] = useState("all");
  // hàm này set chuỗi all để có thể thay đổi giá trị từ data động có đúng không

  // Quản lý dữ liệu item (text + trạng thái completed)
  const [items, setItems] = useState([
    { text: "Item 1", completed: false },
    { text: "Item 2", completed: false },
    { text: "Item 3", completed: false }
  ]);

  // Quản lý input để thêm item mới
  const [inputValue, setInputValue] = useState("");
  // hàm này là giá trị rỗng để người dùng có thể tự add thêm giá trị mới 

  // Hàm thêm item mới
  const addItem = () => {
    //liên kết với dòng 10
    if (inputValue.trim()) {
      // inputValue.trim() là ở đây diều kiện sẽ là đúng nếu người dùng nhập giá trị vào
      setItems([...items, { text: inputValue, completed: false }]);
      //thực hiện cập nhập item
      //...items: Dùng spread operator để lấy tất cả các phần tử hiện có trong mảng items.
      //completed: false được đặt cho mỗi mục mới được thêm vào, 
      // nhằm chỉ ra rằng mục đó chưa được hoàn thành (chưa được đánh dấu qua checkbox).
      //text được gán giá trị của biến inputValue (nội dung người dùng nhập vào).
      setInputValue("");
    }
  };

  // Toggle trạng thái hoàn thành (gạch ngang)
  const toggleCompletion = (index) => {
    const newItems = items.map((item, i) =>
      // dòng này sẽ thực hiên chức năng callback nếu chỉ số trùng với phần tử index
  //Hàm map này sẽ được gọi cho mỗi phần tử (item) trong mảng items để tạo ra mảng mới newItems.
      i === index ? { ...item, completed: !item.completed } : item
      //i === index kiểm tra xem  phần tử hiện tại (i) có bằng giá trị index được truyền vào hàm hay không.
      //Nếu i bằng index, thì phần tử sẽ được cập nhật bằng cách tạo ra một object mới:
      // qua dòng này { ...item, completed: !item.completed }
      //...item: Sao chép toàn bộ các thuộc tính của object gốc.
      //completed: !item.completed: Ghi đè thuộc tính completed với giá trị ngược lại của nó 
      // (nếu trước đó là false thì chuyển thành true, ngược lại)
    );
    setItems(newItems);
    // mục đích của dòng setItems(newItems); là cập nhật state items. 
    // Khi state được cập nhật, React sẽ tự động re-render component để hiển thị giá trị mới.
  };

  // Hàm xoá tất cả các item đã hoàn thành
  const clearCompleted = () => {
    setItems(items.filter(item => !item.completed));
    // Dòng code này lọc các phần tử trong mảng items sao cho chỉ giữ lại những phần tử mà thuộc tính completed có giá trị false
    //  (nghĩa là những phần tử chưa hoàn thành). 
    // Sau đó, kết quả được truyền vào hàm setItems để cập nhật lại trạng thái của items.
  };

  // Nội dung hiển thị cho tab "All"
  const renderAllTab = () => (
    <div>
      {/* Khu vực thêm item */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Add a new item..."
          value={inputValue}
          //dòng 17 mục đích là để thêm giá trị mới sau khi nhập input
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addItem}>Add</button>
      </div>

      {/* Danh sách toàn bộ items */}
      <div className="list">
        {items.map((item, index) => (
          <div key={index} className="list-item">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleCompletion(index)}
            />
            <span className={item.completed ? "completed-item" : ""}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // Nội dung hiển thị cho tab "Active"
  const renderActiveTab = () => (
    <div>
      <p className="tab-title">Active Items</p>
      <div className="list">
        {items
          .filter((item) => !item.completed)
          .map((item, index) => (
            <div key={index} className="list-item">
              {item.text}
            </div>
          ))}
      </div>
    </div>
  );

  // Nội dung hiển thị cho tab "Completed"
  const renderCompletedTab = () => (
    <div className="completed-tab-container">
      <div className="completed-header">
        <p className="tab-title">Completed Items</p>
        <button onClick={clearCompleted} className="clear-completed-button">
          Delete all
        </button>
      </div>
      <div className="list">
        {items
          .filter((item) => item.completed)
          .map((item, index) => (
            <div key={index} className="list-item">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompletion(index)}
                // dòng này mục đích là sử dụng map để tìm item và tạo ra item mới
                // Sau khi dùng filter để chỉ lấy các phần tử có completed là true,
                //  hàm map sẽ chuyển đổi từng phần tử đó thành một phần tử giao diện 
                // map ở đây dùng để biến đổi từng phần tử trong mảng thành giao diện mới (JSX element)
                //  thay vì để tìm kiếm phần tử.
              />
              <span className="completed-item">{item.text}</span>
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="container">
      <h1 className="title">#todo</h1>

      {/* Thanh tab (All - Active - Completed) */}
      <div className="tabs-container">
        <div
          className={`tab ${currentTab === "all" ? "active-tab" : ""}`}
          onClick={() => setCurrentTab("all")}
        >
          All
          {currentTab === "all" && <div className="underline"></div>}
        </div>

        <div
          className={`tab ${currentTab === "active" ? "active-tab" : ""}`}
          // Template literal là khả năng nhúng biến hoặc biểu thức vào chuỗi thông qua cú pháp ${...} 
          // và hỗ trợ tạo chuỗi nhiều dòng một cách tự nhiên
          // Dòng này sử dụng template literal để gán giá trị cho thuộc tính className.
          //  Nó luôn bao gồm lớp "tab" và thêm lớp "active-tab" nếu currentTab bằng "active".
          onClick={() => setCurrentTab("active")}
        >
          Active
          {currentTab === "active" && <div className="underline"></div>}
        </div>

        <div
          className={`tab ${currentTab === "completed" ? "active-tab" : ""}`}
          onClick={() => setCurrentTab("completed")}
        >
          Completed
          {currentTab === "completed" && <div className="underline"></div>}
          {/* sử dụng toán tử và và  */}
        </div>
      </div>

      {/* Nội dung hiển thị tuỳ theo tab */}
      {currentTab === "all" && renderAllTab()}
      {currentTab === "active" && renderActiveTab()}
      {currentTab === "completed" && renderCompletedTab()}
    </div>
  );
}
