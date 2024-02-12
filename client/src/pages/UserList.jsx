import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5); 

  useEffect(() => {
    fetchData(currentPage + 1);
  }, [currentPage, perPage]); 
  
  const fetchData = async (page) => {
    const response = await axios.get(
      `http://localhost:3000/app/v1/user/paginated-data?page=${page}&limit=${perPage}`
    );
    setUsers(response.data.docs);
    setPageCount(response.data.totalPages);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(0); // Reset to first page when per page value changes
  };

  const handleUserNumber = (index) => {
    return currentPage * perPage + index + 1;
  };

  return (
    <div className="container" style={{ paddingTop: "10px" }}>
      <h1>Users List</h1>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>S. No</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{handleUserNumber(index)}</td>
                  <td>{user.username}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={handlePageClick}
              forcePage={currentPage}
              containerClassName={"pagination"}
              activeClassName={"active"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
            />
            <div className="form-group">
              <div>Users per page:- </div>
              <select
                id="perPage"
                className="form-control"
                value={perPage}
                onChange={handlePerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button
        style={{
          padding: "10px",
          backgroundColor: "grey",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        Go to login page!
      </button>
    </div>
  );
}
