import { Heading, Link } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUsers } from "../actions/userAction";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  if (!users.length) {
    return <Spinner />;
  }
  return (
    <div>
      <Heading>Users</Heading>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Blogs created</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>
                <Link as={NavLink} to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </Td>
              <Td>{user.blogs.length}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Users;
